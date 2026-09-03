import axios from "axios";
import { duitkuConfig } from "config/duitku.config";
import crypto from "crypto";

interface DuitkuPaymentMethod {
  paymentMethod: string;
  paymentName: string;
  paymentImage: string;
  totalFee: string;
}

interface DuitkuPaymentMethodResponse {
  paymentFee: DuitkuPaymentMethod[];
  responseCode: string;
  responseMessage: string;
}

interface CreateTransactionResponse {
  merchantCode: string;
  reference: string;
  paymentUrl?: string;
  vaNumber?: string;
  amount: number;
  qrString?: string;
  appUrl?: string;
  statusCode: string;
  statusMessage: string;
}

export class DuitkuService {
  private merchantCode = duitkuConfig.merchantCode;
  private apiKey = duitkuConfig.apiKey;
  private baseUrl = duitkuConfig.baseUrl;

  async getPaymentMethods(amount: number): Promise<DuitkuPaymentMethod[]> {
    const date = new Date();
    const wibDate = new Date(date.getTime() + 7 * 60 * 60 * 1000);

    const YYYY = wibDate.getUTCFullYear();
    const MM = String(wibDate.getUTCMonth() + 1).padStart(2, "0");
    const DD = String(wibDate.getUTCDate()).padStart(2, "0");
    const hh = String(wibDate.getUTCHours()).padStart(2, "0");
    const mm = String(wibDate.getUTCMinutes()).padStart(2, "0");
    const ss = String(wibDate.getUTCSeconds()).padStart(2, "0");

    const datetime = `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;

    const cleanMerchantCode = this.merchantCode.trim();
    const cleanApiKey = this.apiKey.trim();
    const paymentAmount = Math.floor(Number(amount));

    const stringToSign = `${cleanMerchantCode}${paymentAmount}${datetime}`;

    const signature = crypto
      .createHmac("sha256", cleanApiKey)
      .update(stringToSign)
      .digest("hex");

    try {
      const response = await axios.post<DuitkuPaymentMethodResponse>(
        `${this.baseUrl}/merchant/paymentmethod/getpaymentmethod`,
        {
          merchantcode: cleanMerchantCode,
          amount: paymentAmount, // Tipe Data Integer
          datetime: datetime,
          signature: signature,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.responseCode !== "00") {
        throw new Error(
          response.data.responseMessage || "Failed to get payment methods",
        );
      }

      return response.data.paymentFee;
    } catch (error: any) {
      console.error(
        "Duitku getPaymentMethods Error:",
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  async createTransaction(data: {
    merchantOrderId: string;
    paymentAmount: number;
    paymentMethod: string;
    productDetails: string;
    customerVaName: string;
    email: string;
    phoneNumber?: string;
    expiryPeriod: number;
  }): Promise<CreateTransactionResponse> {
    const timestamp = Date.now();

    const signature = crypto
      .createHash("md5")
      .update(
        `${this.merchantCode}${data.merchantOrderId}${data.paymentAmount}${this.apiKey}`,
      )
      .digest("hex");

    const response = await axios.post<CreateTransactionResponse>(
      `${this.baseUrl}/merchant/v2/inquiry`,
      {
        merchantCode: this.merchantCode,
        paymentAmount: data.paymentAmount,
        paymentMethod: data.paymentMethod,
        merchantOrderId: data.merchantOrderId,
        productDetails: data.productDetails,
        customerVaName: data.customerVaName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        callbackUrl: duitkuConfig.callbackUrl,
        returnUrl: duitkuConfig.returnUrl,
        expiryPeriod: data.expiryPeriod,
        signature,
        timestamp,
      },
    );

    if (response.data.statusCode !== "00") {
      throw new Error(
        response.data.statusMessage || "Failed to create Duitku transaction",
      );
    }

    return response.data;
  }
}
