import express from "express";
import { addAttendance } from "../Controllers/attendance.Controller.js";
import { verifyTokenTeacherAndAdmin } from "../Middleware/authMiddleware.js";
const router = express.Router();

// Assume you have authentication middleware that sets req.user and req.user.role
router.post("/add", verifyTokenTeacherAndAdmin, addAttendance);

export default router;