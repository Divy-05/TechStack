import { transporter } from "./NodemailerSetup.js"; // Import the configured transporter

/**
 * Sends an email using Nodemailer.
 *
 * @param {string} to - Recipient email address.
 * @param {string} subject - Email subject.
 * @param {string} htmlContent - HTML content of the email.
 * @returns {Promise<object>} - Resolves with email info or throws an error.
 */
const SendEmail = async (to, subject, htmlContent) => {
  console.log(`📤 Sending email to: ${to}...`);

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER, // Default sender email
    to,
    subject,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully! Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("❌ Failed to send email:", error.message || error);
    throw error; // Rethrow for handling in the caller function
  }
};

// ✅ Export function for reuse
export { SendEmail };
