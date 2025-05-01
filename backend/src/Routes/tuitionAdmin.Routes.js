import express from "express";
import {
  registerTuitionAdmin,
  loginTuitionAdmin,
  getTuitionAdminProfile,
  updateTuitionAdminProfile,
  deleteTuitionAdmin,
  changePassword,
} from "../Controllers/tuitionAdmin.Controller.js";
import { tuitionAdminprotect } from "../Middleware/authMiddleware.js"; // Import middleware
import { teacherStatusUpdate } from "../Controllers/teacher.Controller.js";
const router = express.Router();

router.post("/register", registerTuitionAdmin);
router.post("/login", loginTuitionAdmin);
router.get("/getprofile", tuitionAdminprotect, getTuitionAdminProfile);
router.put("/update", tuitionAdminprotect, updateTuitionAdminProfile);
router.delete("/delete", tuitionAdminprotect, deleteTuitionAdmin);
router.put("/changePassword", tuitionAdminprotect, changePassword);

router.patch("/teacherstatus/:id", tuitionAdminprotect, teacherStatusUpdate);

export default router;
