import nodemailer, { Transporter } from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM ?? "PriceSentinel <noreply@pricesentinel.local>";

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (transporter) return transporter;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  const port = parseInt(SMTP_PORT, 10);
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number.isNaN(port) ? 587 : port,
    secure: port === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  return transporter;
}

/**
 * Sends a price drop alert email. If SMTP is not configured, logs to console.
 */
export const sendPriceAlert = async (
  email: string,
  productName: string,
  oldPrice: number,
  newPrice: number,
): Promise<void> => {
  const subject = `Price drop: ${productName}`;
  const text = [
    `Price drop detected for: ${productName}`,
    ``,
    `Previous price: ${oldPrice}`,
    `New price: ${newPrice}`,
    ``,
    `You are receiving this because you subscribed to price alerts for this product.`,
  ].join("\n");

  const html = [
    `<p><strong>Price drop detected for:</strong> ${productName}</p>`,
    `<p>Previous price: <s>${oldPrice}</s></p>`,
    `<p>New price: <strong>${newPrice}</strong></p>`,
    `<p><small>You are receiving this because you subscribed to price alerts.</small></p>`,
  ].join("");

  const transport = getTransporter();

  if (!transport) {
    console.log(`[Notification] No SMTP configured. Would send to ${email}: ${subject}`);
    return;
  }

  try {
    await transport.sendMail({
      from: SMTP_FROM,
      to: email,
      subject,
      text,
      html,
    });
    console.log(`[Notification] Price alert sent to ${email} for "${productName}"`);
  } catch (error) {
    console.error("[Notification] Failed to send email:", error);
  }
};
