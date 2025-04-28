import express from "express";
import { 
    createTeacher,
    updateTeacher,
    getAllTeachers,
    getTeacherById,
    deleteTeacher,
} from "../Controllers/teacherController.js";
import { 
    tuitionAdminprotect 
} from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/addTeacher", tuitionAdminprotect, createTeacher);
router.put("/updateTeacher/:id", tuitionAdminprotect, updateTeacher);
router.get("/getallTeacher", tuitionAdminprotect, getAllTeachers);
router.get("/getTeacherById/:id", tuitionAdminprotect, getTeacherById);
router.delete("/deleteTeacherById/:id", tuitionAdminprotect, deleteTeacher);

export default router;