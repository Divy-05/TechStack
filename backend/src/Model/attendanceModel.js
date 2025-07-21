import mongoose from "mongoose";

const attendanceModelSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },

  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },

  teacher_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    // Optional, only if created by teacher
  },

  tuition_admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TuitionAdmin",
    // required: true, // Now required
  },

  status: {
    type: String,
    enum: ["Present", "Absent", "Late"],
    required: true,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "createdByModel",
  },

  createdByModel: {
    type: String,
    enum: ["Teacher", "TuitionAdmin"],
    required: true,
  },

  createdAt: { type: String, default: () => new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),},
  updatedAt: { type: String, default: () => new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),},
});

// Middleware to update the `updatedAt` timestamp on save
attendanceModelSchema.pre("save", function (next) {
  this.updatedAt = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
  next();
});

const Attendance = mongoose.model("Attendance", attendanceModelSchema);

export default Attendance;