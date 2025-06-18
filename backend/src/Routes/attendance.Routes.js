import express from "express";
import {
  addAttendance,
  updateAttendance,
} from "../Controllers/attendance.Controller.js";
import {
  tuitionAdminprotect,
  teacherprotect,
} from "../Middleware/authMiddleware.js";

const router = express.Router();

// Teacher can add attendance for today only
router.post("/addAttendance", teacherprotect, addAttendance);

// Tuition admin can add attendance for today or yesterday
router.post("/addAttendance/admin", tuitionAdminprotect, addAttendance);

// Teacher can update attendance for today only
router.put("/updateAttendance/teacher/:id", teacherprotect, updateAttendance);

// Tuition admin can update attendance for today or yesterday
router.put("/updateAttendance/admin/:id", tuitionAdminprotect, updateAttendance);

export default router;