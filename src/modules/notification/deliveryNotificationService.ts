import { NotificationType } from "@prisma/client";
import { NotificationService } from "modules/notification/notification.service";

const notificationService = new NotificationService();

export class DeliveryNotificationService {
  async assigned(params: {
    deliveryId: string;
    courierUserId: string;
    orderId?: string | null;
  }) {
    const { deliveryId, courierUserId, orderId } = params;

    return notificationService.sendNotificationToRecipient({
      recipientType: "USER",
      recipientId: courierUserId,

      title: "Pesanan Baru",
      message: "Ada pesanan pengiriman baru yang tersedia untuk Anda.",

      type: NotificationType.SYSTEM,

      entityId: deliveryId,

      data: {
        type: "DELIVERY_ASSIGNED",
        action: "OPEN_DELIVERY",

        deliveryId,
        orderId: orderId ?? "",
      },
    });
  }

  async accepted(params: {
    deliveryId: string;
    customerUserId: string;
    courierUserId?: string;
    orderId?: string | null;
  }) {
    const { deliveryId, customerUserId, courierUserId, orderId } = params;

    return notificationService.sendNotificationToRecipient({
      recipientType: "USER",
      recipientId: customerUserId,

      title: "Kurir Menerima Pesanan",
      message:
        "Kurir telah menerima pesanan Anda dan akan segera mengambil paket.",

      type: NotificationType.SYSTEM,

      entityId: deliveryId,

      data: {
        type: "DELIVERY_ACCEPTED",
        action: "OPEN_DELIVERY",

        deliveryId,
        orderId: orderId ?? "",
        courierUserId: courierUserId ?? "",
      },
    });
  }

  async pickedUp(params: {
    deliveryId: string;
    customerUserId: string;
    courierUserId?: string;
    orderId?: string | null;
  }) {
    const { deliveryId, customerUserId, courierUserId, orderId } = params;

    return notificationService.sendNotificationToRecipient({
      recipientType: "USER",
      recipientId: customerUserId,

      title: "Pesanan Telah Diambil",
      message: "Kurir telah mengambil paket Anda.",

      type: NotificationType.SYSTEM,

      entityId: deliveryId,

      data: {
        type: "DELIVERY_PICKED_UP",
        action: "OPEN_DELIVERY",

        deliveryId,
        orderId: orderId ?? "",
        courierUserId: courierUserId ?? "",
      },
    });
  }

  async onTheWay(params: {
    deliveryId: string;
    customerUserId: string;
    courierUserId?: string;
    orderId?: string | null;
  }) {
    const { deliveryId, customerUserId, courierUserId, orderId } = params;

    return notificationService.sendNotificationToRecipient({
      recipientType: "USER",
      recipientId: customerUserId,

      title: "Kurir Sedang Menuju Tujuan",
      message: "Kurir sedang mengantarkan pesanan Anda ke lokasi tujuan.",

      type: NotificationType.SYSTEM,

      entityId: deliveryId,

      data: {
        type: "DELIVERY_ON_THE_WAY",
        action: "OPEN_DELIVERY_TRACKING",

        deliveryId,
        orderId: orderId ?? "",
        courierUserId: courierUserId ?? "",
      },
    });
  }

  async delivered(params: {
    deliveryId: string;
    customerUserId: string;
    courierUserId: string;
    orderId?: string | null;
  }) {
    const { deliveryId, customerUserId, courierUserId, orderId } = params;

    const customerNotification =
      notificationService.sendNotificationToRecipient({
        recipientType: "USER",
        recipientId: customerUserId,

        title: "Pesanan Selesai",
        message: "Pesanan Anda telah berhasil dikirim.",

        type: NotificationType.SYSTEM,

        entityId: deliveryId,

        data: {
          type: "DELIVERY_DELIVERED",
          action: "OPEN_DELIVERY",

          deliveryId,
          orderId: orderId ?? "",
          courierUserId,
        },
      });

    const courierNotification = notificationService.sendNotificationToRecipient(
      {
        recipientType: "USER",
        recipientId: courierUserId,

        title: "Pengiriman Selesai",
        message:
          "Pengiriman berhasil diselesaikan. Pendapatan Anda telah diproses.",

        type: NotificationType.SYSTEM,

        entityId: deliveryId,

        data: {
          type: "DELIVERY_DELIVERED",
          action: "OPEN_DELIVERY",

          deliveryId,
          orderId: orderId ?? "",
        },
      },
    );

    return Promise.all([customerNotification, courierNotification]);
  }

  async cancelled(params: {
    deliveryId: string;
    customerUserId: string;
    orderId?: string | null;
    reason?: string;
  }) {
    const { deliveryId, customerUserId, orderId, reason } = params;

    return notificationService.sendNotificationToRecipient({
      recipientType: "USER",
      recipientId: customerUserId,

      title: "Pesanan Dibatalkan",
      message: reason || "Pesanan pengiriman Anda telah dibatalkan.",

      type: NotificationType.SYSTEM,

      entityId: deliveryId,

      data: {
        type: "DELIVERY_CANCELLED",
        action: "OPEN_DELIVERY",

        deliveryId,
        orderId: orderId ?? "",
      },
    });
  }

  async paymentPaid(params: {
    deliveryId: string;
    customerUserId: string;
    amount: number;
    orderId?: string | null;
  }) {
    const { deliveryId, customerUserId, amount, orderId } = params;

    return notificationService.sendNotificationToRecipient({
      recipientType: "USER",
      recipientId: customerUserId,

      title: "Pembayaran Berhasil",
      message: `Pembayaran delivery sebesar Rp${amount.toLocaleString(
        "id-ID",
      )} berhasil.`,

      type: NotificationType.SYSTEM,

      entityId: deliveryId,

      data: {
        type: "DELIVERY_PAYMENT_PAID",
        action: "OPEN_DELIVERY",

        deliveryId,
        orderId: orderId ?? "",
        amount: String(amount),
      },
    });
  }

  async noCourier(params: {
    deliveryId: string;
    customerUserId: string;
    orderId?: string | null;
  }) {
    const { deliveryId, customerUserId, orderId } = params;

    return notificationService.sendNotificationToRecipient({
      recipientType: "USER",
      recipientId: customerUserId,

      title: "Sedang Mencari Kurir",
      message: "Kami masih mencari kurir yang tersedia untuk pesanan Anda.",

      type: NotificationType.SYSTEM,

      entityId: deliveryId,

      data: {
        type: "DELIVERY_NO_COURIER",
        action: "OPEN_DELIVERY",

        deliveryId,
        orderId: orderId ?? "",
      },
    });
  }
}
