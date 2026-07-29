// import { mailTransporter } from "config/mail.config";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API);

export const sendEmail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    // from: `"NTB HUB" <${process.env.EMAIL_USER}>`,
    from: `lferdianyusuf@gmail.com`,
    to,
    subject,
    html,
  };
  // await mailTransporter.sendMail(mailOptions);

  // const command = new SendEmailCommand({
  //   Source: `"NTB HUB" <${process.env.SES_FROM_EMAIL}>`,
  //   Destination: {
  //     ToAddresses: [to],
  //   },
  //   Message: {
  //     Subject: {
  //       Data: subject,
  //       Charset: "UTF-8",
  //     },
  //     Body: {
  //       Html: {
  //         Data: html,
  //         Charset: "UTF-8",
  //       },
  //     },
  //   },
  // });
  // await ses.send(command);

  await resend.emails.send(mailOptions);
  // return await mailTransporter.sendMail({
  //   from: `"NTB HUB" <${process.env.SES_FROM_EMAIL}>`,
  //   to,
  //   subject,
  //   html,
  // });
};
