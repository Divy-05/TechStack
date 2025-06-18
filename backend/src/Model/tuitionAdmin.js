import mongoose from "mongoose";

const tuitionAdminSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },

    email: { 
        type: String, 
        required: true, 
        unique: true 
    },

    password: { 
        type: String, 
        required: true 
    },

    institution_name: { 
        type: String, 
        // required: true 
    },

    contact_number: { 
        type: Number, 
        required: true,
        unique: true  
    },

    address: { 
        type: String, 
        // required: true 
    },

    permissions: {
        manage_students: { type: Boolean, default: false },
        manage_teachers: { type: Boolean, default: false },
        manage_attendance: { type: Boolean, default: false },
        manage_exams: { type: Boolean, default: false },
        manage_fees: { type: Boolean, default: false },
        send_notifications: { type: Boolean, default: false },
        generate_reports: { type: Boolean, default: false }
    },

    status: {
        type: String,
        enum: ['Active', 'Blocked'],
        default: 'Active'
    },

    createdAt: { type: String, default: () => new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }) },
    updatedAt: { type: String, default: () => new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }) }
});

// Middleware to update the `updatedAt` timestamp on save
tuitionAdminSchema.pre("save", function (next) {
    this.updatedAt = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    next();
});

const TuitionAdmin = mongoose.models.TuitionAdmin || mongoose.model("TuitionAdmin", tuitionAdminSchema);

export default TuitionAdmin;