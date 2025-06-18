import mongoose from "mongoose";

const adminModelSchema = new mongoose.Schema({
    name: { 
        type: String 
    },

    email: { 
        type: String, 
        unique: true 
    },

    password: { 
        type: String 
    },

    role: { 
        type: String, 
        // default: 'App Admin' //here deafult App Admin will not come 
        default:"pseudoAdmin"
    },

    manage_tuition_admins: { 
        type: Boolean, 
        default: false 
    },

    view_reports: { 
        type: Boolean, 
        default: false 
    },

    manage_settings: { 
        type: Boolean, 
        default: false 
    },
    
    createdAt: { type: String, default: () => new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }) },
    updatedAt: { type: String, default: () => new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }) }
});

// Middleware to update the `updatedAt` timestamp on save
adminModelSchema.pre("save", function (next) {
    this.updatedAt = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    next();
});

const pseudoAdmin = mongoose.model('pseudoAdmin', adminModelSchema);

export default pseudoAdmin;