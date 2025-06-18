import express from "express";
import dotenv from "dotenv";
import process from "process";
import connectDB from "./src/config/Database.js";
import cors from "cors";

// Admin Routes
import AdminRoutes from "./src/Routes/pseudoAdmin.Routes.js";
import TuitionAdminRoutes from "./src/Routes/tuitionAdmin.Routes.js";
import StudentRoutes from "./src/Routes/student.Routes.js";
import authRoutes from "./src/Routes/Auth.Routes.js";
import teacherRoutes from './src/Routes/teacher.Routes.js';
import attendanceRoutes from "./src/Routes/attendance.Routes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL,"https://teechtrack.vercel.app"],
    credentials: true,
  })
);

connectDB();

// Sample Route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Admin local routes
app.use("/AppAdmin", AdminRoutes);
app.use("/TuitionAdmin", TuitionAdminRoutes);
app.use("/TuitionADMIN/Student", StudentRoutes);
app.use("/api/auth", authRoutes);
app.use("/teacher", teacherRoutes);
app.use("/attendance", attendanceRoutes);

// ✅ Ensure Vercel recognizes the export
export default app;

// ✅ Ensure it runs locally
if (process.env.NODE_ENV !== "vercel") {
  const PORT = process.env.PORT || 2405;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}
