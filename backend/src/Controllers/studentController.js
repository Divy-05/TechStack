import Student from "../Model/studentModel.js";
import TuitionAdmin from "../Model/tuitionAdmin.js";
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
    if (!student)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(date_of_birth, student.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

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
      return res
        .status(401)
        .json({ message: "Unauthorized, no student found" });
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
    const {
      name,
      email,
      date_of_birth,
      gender,
      class: studentClass,
      section,
      subjects,
      contact_number,
    } = req.body;

    const studentExists = await Student.findOne({ email });
    if (studentExists)
      return res.status(400).json({ message: "Student already exists" });

    const formattedDOB = date_of_birth.replace(/-/g, ""); // Remove hyphens

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(formattedDOB, salt);

    // Generate unique 6-digit enrollment number
    let enrollment_number;
    let isUnique = false;

    while (!isUnique) {
      enrollment_number = Math.floor(
        100000 + Math.random() * 900000
      ).toString();
      const existingStudent = await Student.findOne({ enrollment_number });
      if (!existingStudent) isUnique = true;
    }

    const newStudent = await Student.create({
      name,
      email,
      password: hashedPassword,
      date_of_birth: formattedDOB,
      gender,
      enrollment_number,
      class: studentClass,
      section,
      subjects,
      contact_number,
      createdBy: req.admin._id, // Changed from tuition_admin_id to createdBy
    });

    // Update admin permissions
    await TuitionAdmin.findByIdAndUpdate(
      req.admin._id,
      {
        "permissions.manage_students": true,
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      student: {
        _id: newStudent._id,
        name: newStudent.name,
        email: newStudent.email,
        date_of_birth: newStudent.date_of_birth,
        gender: newStudent.gender,
        enrollment_number: newStudent.enrollment_number,
        class: newStudent.class,
        section: newStudent.section,
        subjects: newStudent.subjects,
        contact_number: newStudent.contact_number,
        createdBy: newStudent.createdBy,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error creating student",
      error: error.message,
    });
  }
};

// Update Student (Only for Tuition Admins - Only their students)
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findOne({
      _id: req.params.id,
      createdBy: req.admin._id, // Changed from tuition_admin_id to createdBy
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message:
          "Student not found or you don't have permission to update this student",
      });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name || student.name,
        email: req.body.email || student.email,
        class: req.body.class || student.class,
        section: req.body.section || student.section,
        subjects: req.body.subjects || student.subjects,
        contact_number: req.body.contact_number || student.contact_number,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating student",
      error: error.message,
    });
  }
};

// Get All Students (Only for Tuition Admins - Only their students)
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({
      createdBy: req.admin._id, // Changed from tuition_admin_id to createdBy
    }).select("-password");

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching students",
      error: error.message,
    });
  }
};

// Get Student by ID (Only for Tuition Admins - Only their students)
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findOne({
      _id: req.params.id,
      createdBy: req.admin._id, // Changed from tuition_admin_id to createdBy
    }).select("-password");

    if (!student) {
      return res.status(404).json({
        success: false,
        message:
          "Student not found or you don't have permission to view this student",
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching student",
      error: error.message,
    });
  }
};

// Delete Student (Only for Tuition Admins - Only their students)
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.admin._id, // Changed from tuition_admin_id to createdBy
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message:
          "Student not found or you don't have permission to delete this student",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting student",
      error: error.message,
    });
  }
};

export {
  loginStudent,
  getStudentProfile,
  getAllStudents,
  createStudent,
  updateStudent,
  getStudentById,
  deleteStudent,
};
