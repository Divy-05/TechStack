import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  updateAdminProfile,
  getAllTuitionAdmins,
  deleteTuitionAdmin,
} from "../Controllers/pseudoAdminControllers.js";
import { protect } from "../Middleware/authMiddleware.js"; // Import middleware

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/getprofile", protect, getAdminProfile); // Protected Route
router.put("/update", protect, updateAdminProfile); // Protected Route

// Get all tuition admins (Main Admin Access Only)
router.get("/tuition-admins", protect, getAllTuitionAdmins);

// Delete a tuition admin (Main Admin Access Only)
router.delete("/tuition-admins/:id", protect, deleteTuitionAdmin);

export default router;
