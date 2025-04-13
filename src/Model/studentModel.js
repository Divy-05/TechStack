import mongoose from "mongoose";

const studentModelSchema = new mongoose.Schema({
    name: { 
        type: String 
    },

    email: { 
        type: String, 
        // unique: true 
    },
    
    password: { 
        type: String, 
        required: true 
    }, 

    contact_number: {
        type: Number, 
        // unique: true 
    },

    date_of_birth	: {
        type: String 
    },

    gender: {
        type: String,
        enum: ["Male" ,"Female" , "Other"]
    },

    enrollment_number: {
        type: String 
    },

    class: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] // Use numbers instead of strings
    },

    section: {
        type: String,
        enum: ["A" ,"B" , "C", "D", "E", "F", "G", "H"]
    },

    subjects: {
        type: [String],
        enum: ["Maths", "Science", "English", "History", "Geography", "Computer Science"]
    },
    
    createdAt: { type: String, default: () => new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }) },
    updatedAt: { type: String, default: () => new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }) }
});

// Middleware to update the `updatedAt` timestamp on save
studentModelSchema.pre("save", function (next) {
    this.updatedAt = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    next();
});

const Student = mongoose.model('Student', studentModelSchema);

export default Student;
