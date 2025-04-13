import express from "express";
import {
    registerTuitionAdmin,
    loginTuitionAdmin,
    getTuitionAdminProfile,
    updateTuitionAdminProfile,
    deleteTuitionAdmin,
    changePassword,
} from "../Controllers/tuitionAdminController.js";
import { tuitionAdminprotect } from "../Middleware/authMiddleware.js"; // Import middleware

const router = express.Router();

router.post("/register", registerTuitionAdmin);
router.post("/login", loginTuitionAdmin);
router.get("/getprofile", tuitionAdminprotect, getTuitionAdminProfile);
router.put("/update", tuitionAdminprotect, updateTuitionAdminProfile);
router.delete("/delete", tuitionAdminprotect, deleteTuitionAdmin);
router.put("/changePassword", tuitionAdminprotect, changePassword); 

export default router;