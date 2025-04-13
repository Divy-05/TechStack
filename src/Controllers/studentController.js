import Student from "../Model/studentModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// STUDENT FUNCTIONALITY  
// login student 
const loginStudent = async (req, res) => {
    try {
        const { email, date_of_birth } = req.body;

        const student = await Student.findOne({ email });
        if (!student) return res.status(400).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(date_of_birth, student.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        res.status(200).json({
            _id: student._id,
            name: student.name,
            email: student.email,
            token: generateToken(student._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Student Profile (Only for students)
const getStudentProfile = async (req, res) => {
    try {
        if (!req.student) {
            return res.status(401).json({ message: "Unauthorized, no student found" });
        }

        const student = await Student.findById(req.student._id).select("-password");

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// TUTION ADMIN FUNCTIONALITY
// Create Student (Only for Tuition Admins)
const createStudent = async (req, res) => {
    try {
        const { name, email, date_of_birth, gender, class: studentClass, section, subjects, contact_number } = req.body;

        const studentExists = await Student.findOne({ email });
        if (studentExists) return res.status(400).json({ message: "Student already exists" });

        const formattedDOB = date_of_birth.replace(/-/g, ""); // Remove hyphens

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(formattedDOB, salt);

        // Function to generate a unique 6-digit enrollment number
        let enrollment_number;
        let isUnique = false;

        while (!isUnique) {
            enrollment_number = Math.floor(100000 + Math.random() * 900000).toString();
            const existingStudent = await Student.findOne({ enrollment_number });
            if (!existingStudent) isUnique = true;
        }

        const newStudent = await Student.create({
            name,
            email,
            password: hashedPassword,
            date_of_birth: formattedDOB, // Store formatted date of birth
            gender,
            enrollment_number,
            class: studentClass,
            section,
            subjects,
            contact_number,
        });

        res.status(201).json({
            message: "Student registered successfully",
            student: {
                _id: newStudent._id,
                name: newStudent.name,
                email: newStudent.email,
                date_of_birth: newStudent.date_of_birth, // Already formatted
                gender: newStudent.gender,
                enrollment_number: newStudent.enrollment_number,
                class: newStudent.class,
                section: newStudent.section,
                subjects: newStudent.subjects,
                contact_number: newStudent.contact_number,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Student (Only for Tuition Admins)
const updateStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });

        student.name = req.body.name || student.name;
        student.email = req.body.email || student.email;
        student.class = req.body.class || student.class;
        student.section = req.body.section || student.section;
        student.subjects = req.body.subjects || student.subjects;
        student.contact_number = req.body.contact_number || student.contact_number;
        // student.enrollment_number = req.body.enrollment_number || student.enrollment_number;

        await student.save();
        res.status(200).json({ message: "Student updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Students (Only for Tuition Admins)
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().select("-password");
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Student by ID (Only for Tuition Admins)
const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Student (Only for Tuition Admins)
const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { 
    loginStudent, 
    getStudentProfile, 
    getAllStudents, 
    createStudent, 
    updateStudent,
    getStudentById, 
    deleteStudent 
};
