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
    // Not required, can be null if created by admin
  },

  tuition_admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TuitionAdmin",
    // Not required, can be null if created by teacher
  },

  status: {
    type: String,
    enum: ["Present", "Absent", "Late"],
    required: true,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "createdByModel",
    required: true,
  },

  createdByModel: {
    type: String,
    enum: ["Teacher", "TuitionAdmin"],
    required: true,
  },

  createdAt: {type: String, default: () => new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),},
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


/* 
there are some fix like   
createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "createdByModel", = only tutuion admin id 
    required: true,
}, 
 
add func. tuition admin or teacher can add atendance only there tution student not other student 
*/

