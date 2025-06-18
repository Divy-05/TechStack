import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  contact_number: {
    type: Number,
    required: true,
  },

  qualification: {
    type: String,
    required: true,
  },

  subjects: {
    type: [String],
    required: true,
  },

  availability: {
    days: {
      type: [String],
      required: true,
    },
    time_slots: {
      type: [String],
      required: true,
    },
  },
  
  status: {
    type: String,
    enum: ['Active', 'Blocked'],
    default: 'Active'
  },

  permissions: {
    manage_students: { type: Boolean, default: false },
    manage_attendance: { type: Boolean, default: false },
    manage_exams: { type: Boolean, default: false },
    generate_reports: { type: Boolean, default: false }
  },

  createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'TuitionAdmin', 
      required: true 
  },
  
    createdAt: { type: String, default: () => new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }) },
    updatedAt: { type: String, default: () => new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }) }

}, );

// Middleware to update the `updatedAt` timestamp on save
teacherSchema.pre("save", function (next) {
    this.updatedAt = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    next();
});

const Teacher = mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);

export default Teacher;