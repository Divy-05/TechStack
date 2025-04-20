import jwt from "jsonwebtoken";
import Admin from "../Model/pseudoAdmin.js";
import TuitionAdmin from "../Model/tuitionAdmin.js";
import Student from "../Model/studentModel.js";

const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (token) {
    try {
      if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1]; // Remove "Bearer" prefix
      }

      //   console.log("Received Token:", token); // Debugging

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded); // Debugging

      req.admin = await Admin.findById(decoded.id).select("-password");

      if (!req.admin) {
        return res.status(401).json({ message: "Admin not found" });
      }

      next();
    } catch (error) {
      console.error("JWT Error:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    console.log("No Token Found in Headers");
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// tuitionAdminController.js
const tuitionAdminprotect = async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    try {
      token = req.headers.authorization;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = await TuitionAdmin.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};


// student authentication middleware
const protectStudent = async (req, res, next) => {
  try {
      // console.log("🔹 Middleware Executed!");
      // console.log("🔹 Headers Received:", req.headers);

      let token = req.headers.authorization;

      if (!token) {
          // console.log("❌ No Authorization Header Found!");
          return res.status(401).json({ message: "Unauthorized, no token provided" });
      }

      // **REMOVE the 'Bearer ' check** to directly use the token
      // console.log("🔹 Extracted Token:", token);

      // Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("✅ Decoded Token:", decoded);

      req.student = await Student.findById(decoded.id).select("-password");

      if (!req.student) {
          // console.log("❌ Unauthorized, student not found!");
          return res.status(401).json({ message: "Unauthorized, student not found" });
      }

      // console.log("✅ Student Found:", req.student);
      next();
  } catch (error) {
      // console.error("❌ Token Verification Failed:", error.message);
      res.status(401).json({ message: "Unauthorized, invalid token" });
  }
};

export { 
  protect, 
  tuitionAdminprotect,   
  protectStudent 
};






