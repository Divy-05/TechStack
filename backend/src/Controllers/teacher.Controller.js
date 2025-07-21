import Teacher from "../Model/teacherModel.js";
import TuitionAdmin from "../Model/tuitionAdmin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Create a new teacher
const createTeacher = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      contact_number,
      qualification,
      subjects,
      availability_days,
      availability_time_slots,
    } = req.body;

    // Check if teacher already exists
    const teacherExists = await Teacher.findOne({ email });
    if (teacherExists) {
      return res.status(400).json({
        success: false,
        message: "Teacher with this email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new teacher
    const teacher = new Teacher({
      name,
      email,
      password: hashedPassword,
      contact_number,
      qualification,
      subjects: subjects.split(",").map((item) => item.trim()),
      availability: {
        days: availability_days.split(",").map((item) => item.trim()),
        time_slots: availability_time_slots
          .split(",")
          .map((item) => item.trim()),
      },
      createdBy: req.admin._id, // Changed from tuition_admin_id to createdBy
    });

    await teacher.save();

    // Update admin permissions
    await TuitionAdmin.findByIdAndUpdate(
      req.admin._id,
      {
        "permissions.manage_teachers": true,
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      data: teacher,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Error creating teacher",
      error: error.message,
    });
  }
};

// Get all teachers for the logged-in admin
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find({ createdBy: req.admin._id }).select(
      "-__v"
    );

    res.status(200).json({
      success: true,
      count: teachers.length,
      data: teachers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error retrieving teachers",
      error: error.message,
    });
  }
};

// Get teacher by ID (only if created by the logged-in admin)
const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({
      _id: req.params.id,
      createdBy: req.admin._id,
    }).select("-__v");

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message:
          "Teacher not found or you don't have permission to view this teacher",
      });
    }

    res.status(200).json({
      success: true,
      data: teacher,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error retrieving teacher",
      error: error.message,
    });
  }
};

// Update teacher (only if created by the logged-in admin)
const updateTeacher = async (req, res) => {
  try {
    const {
      name,
      email,
      contact_number,
      qualification,
      subjects,
      availability_days,
      availability_time_slots,
    } = req.body;

    // First check if teacher exists and belongs to this admin
    const teacher = await Teacher.findOne({
      _id: req.params.id,
      createdBy: req.admin._id,
    });

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message:
          "Teacher not found or you don't have permission to update this teacher",
      });
    }

    // Process updates
    const updates = {
      name: name || teacher.name,
      email: email || teacher.email,
      contact_number: contact_number || teacher.contact_number,
      qualification: qualification || teacher.qualification,
    };

    if (subjects) {
      updates.subjects = subjects.split(",").map((item) => item.trim());
    }

    if (availability_days && availability_time_slots) {
      updates.availability = {
        days: availability_days.split(",").map((item) => item.trim()),
        time_slots: availability_time_slots
          .split(",")
          .map((item) => item.trim()),
      };
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Teacher updated successfully",
      data: updatedTeacher,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Error updating teacher",
      error: error.message,
    });
  }
};

// Delete teacher (only if created by the logged-in admin)
const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.admin._id,
    });

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message:
          "Teacher not found or you don't have permission to delete this teacher",
      });
    }

    res.status(200).json({
      success: true,
      message: "Teacher deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error deleting teacher",
      error: error.message,
    });
  }
};

// Update teacher status by Tuition Admin
const teacherStatusUpdate = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Active", "Blocked"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value. Must be either 'Active' or 'Blocked'",
      });
    }

    const teacher = await Teacher.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.admin._id,
      },
      { status },
      { new: true }
    );

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message:
          "Teacher not found or you don't have permission to update this teacher",
      });
    }

    res.status(200).json({
      success: true,
      message: `Teacher ${
        status === "Blocked" ? "blocked" : "activated"
      } successfully`,
      data: teacher,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update teacher status",
      error: error.message,
    });
  }
};

const loginTeacher = async (req, res) => {
  try {
    const { email, contact_number, password } = req.body;

    if (!email && !contact_number) {
      return res
        .status(400)
        .json({ message: "Email or contact number is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const teacher = await Teacher.findOne({
      $or: [{ email }, { contact_number }],
    });
    if (!teacher) {
      return res
        .status(401)
        .json({ message: "Invalid email/contact number or password" });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid email/contact number or password" });
    }

    res.status(200).json({
      _id: teacher._id,
      name: teacher.name,
      email: teacher.email,
      contact_number: teacher.contact_numberTeacher,
      token: generateToken(teacher._id),
      status: teacher.status,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to Login teacher",
      error: error.message,
    });
  }
}

// Update Permission by Tuition Admin
// const permissionUpdate = async (req, res) => {
//   try {
//     const { permissionKey, value } = req.body;

//     const validPermissions = [
//       'manage_students',
//       'manage_attendance',
//       'manage_exams',
//       'generate_reports'
//     ];

//     if (!validPermissions.includes(permissionKey)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid permission key'
//       });
//     }

//     const updatedTeacher = await Teacher.findOneAndUpdate(
//       {
//         _id: req.params.id,
//         createdBy: req.admin._id,
//       },
//       { [`permissions.${permissionKey}`]: value },
//       { new: true }
//     );

//     if (!updatedTeacher) {
//       return res.status(404).json({
//         success: false,
//         message: "Teacher not found or you don't have permission to update this teacher"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Permission updated successfully',
//       data: updatedTeacher.permissions
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update Permission',
//       error: error.message
//     });
//   }
// }
const permissionUpdate = async (req, res) => {
  try {
    const { permissions } = req.body;

    const validPermissions = [
      'manage_students',
      'manage_attendance',
      'manage_exams',
      'generate_reports'
    ];

    const invalidKeys = Object.keys(permissions).filter(
      key => !validPermissions.includes(key)
    );

    if (invalidKeys.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Invalid permission keys: ${invalidKeys.join(', ')}`
      });
    }

    const updateFields = {};
    for (const key in permissions) {
      updateFields[`permissions.${key}`] = permissions[key];
    }

    const updatedTeacher = await Teacher.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.admin._id,
      },
      { $set: updateFields },
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found or you don't have permission to update this teacher"
      });
    }

    res.status(200).json({
      success: true,
      message: 'Permissions updated successfully',
      data: updatedTeacher.permissions
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to update permissions',
      error: error.message
    });
  }
};

export {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  teacherStatusUpdate,
  loginTeacher,
  permissionUpdate
};