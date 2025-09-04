import TuitionAdmin from "../Model/tuitionAdminModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { passwordResetEmail } from "../mailSetup/MailTemplates.js";
import { SendEmail } from "../mailSetup/SendEmail.js";
let otpStore = {}; // In-memory store for OTPs (for demo purposes, consider using a database in production)


//Routes  handler for password reset
export const ResetPassword = async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body;
      console.log("🔄 ResetPassword initiated for email:", email);
  
      // ✅ Check if the user exists
      const user = await TuitionAdmin.findOne({ email });
      if (!user) {
        console.log(`❌ User not found: ${email}`);
        return res.status(404).json({ message: "❌ User not found." });
      }
  
      // ✅ Step 1: Send OTP
      if (!otp && !newPassword) {
        const response = await sendOtp(email);
        return res.status(response.status).json({ message: response.message });
      }
  
      // ✅ Step 2: Verify OTP
      if (otp && !newPassword) {
        const verifyResponse = verifyOtp(email, otp);
        return res
          .status(verifyResponse.status)
          .json({ message: verifyResponse.message });
      }
  
      // ✅ Step 3: Update Password (Only if OTP was verified)
      if (!otp && newPassword) {
        const updateResponse = await updatePassword(email, newPassword);
        return res
          .status(updateResponse.status)
          .json({ message: updateResponse.message });
      }
  
      return res.status(400).json({ message: "❌ Invalid request parameters." });
    } catch (error) {
      console.error("❌ Error during ResetPassword process:", error);
      return res
        .status(500)
        .json({ message: "❌ Internal server error", error: error.message });
    }
  };

// Function to send OTP
const sendOtp = async (email) => {
    try {
      const otp = crypto.randomInt(100000, 999999).toString();
      otpStore[email] = { otp, expiresAt: Date.now() + 10 * 60 * 1000 }; // OTP valid for 10 minutes
      console.log("📩 Stored OTP:", otp, "for email:", email);
  
      const htmlContent = passwordResetEmail(otp);
      await SendEmail(email, "🔐 Password Reset OTP", htmlContent);
  
      return { status: 200, message: "📩 OTP sent to your email." };
    } catch (error) {
      console.error("❌ Error sending OTP:", error);
      return { status: 500, message: "❌ Error sending OTP." };
    }
  };

// Function to verify OTP
const verifyOtp = (email, otp) => {
    const storedOtp = otpStore[email];
  
    if (!storedOtp) {
      console.log(`❌ No OTP found for email: ${email}`);
      return { status: 400, message: "❌ Invalid or expired OTP." };
    }
  
    console.log("📜 Stored OTP:", storedOtp.otp, "Received OTP:", otp);
  
    if (storedOtp.otp !== String(otp) || Date.now() > storedOtp.expiresAt) {
      console.log("❌ OTP mismatch or expired.");
      return { status: 400, message: "❌ Invalid or expired OTP." };
    }
  
    delete otpStore[email]; // Remove OTP after successful verification
    console.log("✅ OTP verified successfully.");
    return { status: 200, message: "✅ OTP verified successfully." };
  };

// Function to update password
const updatePassword = async (email, newPassword) => {
    try {
      // ✅ Fetch the user from the database
      const user = await TuitionAdmin.findOne({ email });
      if (!user) {
        console.log(`❌ User not found: ${email}`);
        return { status: 404, message: "❌ User not found." };
      }
  
      console.log("🔑 Updating password for:", email);
  
      // ✅ Ensure user has a password before comparing
      if (!user.password) {
        console.log(`⚠️ No existing password found for: ${email}`);
        return {
          status: 400,
          message: "❌ Unable to reset password, please contact support.",
        };
      }
      console.log("User Password (before update): ", user.password);
  
      // ✅ Check if the new password matches the existing one
      const isSamePassword = await bcrypt.compare(newPassword, user.password);
      if (isSamePassword) {
        console.log("❌ New password cannot be the same as the old password.");
        return {
          status: 400,
          message: "❌ New password cannot be the same as the old password.",
        };
      }
  
      console.log("New password to be hashed:", newPassword);
      // ✅ Hash the new password and update it in the database
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      console.log("New Hashed Password: ", hashedPassword);
  
      // Update the password in the database and get the updated document
      const updateResult = await TuitionAdmin.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true } // This returns the updated document
      );
  
      if (!updateResult) {
        console.log("❌ Update operation failed");
        return { status: 500, message: "❌ Error updating password." };
      }
  
      console.log("User Password (after update): ", updateResult.password);
  
      console.log(`✅ Password updated successfully for ${email}`);
      return { status: 200, message: "✅ Password updated successfully." };
    } catch (error) {
      console.error("❌ Error updating password:", error);
      return { status: 500, message: "❌ Error updating password." };
    }
  };