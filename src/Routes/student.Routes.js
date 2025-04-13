import express from "express";
import { 
    loginStudent, 
    getStudentProfile, 
    getAllStudents, 
    createStudent, 
    updateStudent, 
    getStudentById,
    deleteStudent 
} from "../Controllers/studentController.js";
import { 
    protectStudent, 
    tuitionAdminprotect 
} from "../Middleware/authMiddleware.js";

const router = express.Router();

// Student login
router.post("/login", loginStudent);

// Student profile (Only for logged-in students)
router.get("/StudentProfile", protectStudent, getStudentProfile);

// Tution Admin-only routes (CRUD operations)
router.get("/getall", tuitionAdminprotect, getAllStudents);
router.post("/create", tuitionAdminprotect, createStudent);
router.put("/updateStudent/:id", tuitionAdminprotect, updateStudent);
router.get("/getStudentById/:id", tuitionAdminprotect, getStudentById);
router.delete("/deleteStudent/:id", tuitionAdminprotect, deleteStudent);

export default router;