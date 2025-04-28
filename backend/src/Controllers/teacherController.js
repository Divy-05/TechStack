import Teacher from "../Model/teacherModel.js";

// Create a new teacher
const createTeacher = async (req, res) => {
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

    if (
      !name ||
      !email ||
      !contact_number ||
      !qualification ||
      !subjects ||
      !availability_days ||
      !availability_time_slots
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }

    const subjectsArray = subjects.split(",").map((item) => item.trim());
    const daysArray = availability_days.split(",").map((item) => item.trim());
    const timeSlotsArray = availability_time_slots
      .split(",")
      .map((item) => item.trim());

    const newTeacher = new Teacher({
      name,
      email,
      contact_number,
      qualification,
      subjects: subjectsArray,
      availability: {
        days: daysArray,
        time_slots: timeSlotsArray,
      },
      tuition_admin_id: req.admin._id,
    });

    const savedTeacher = await newTeacher.save();

    res.status(201).json({
      message: "Teacher created successfully",
      data: savedTeacher,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Error creating teacher",
      error: error.message || error,
    });
  }
};

// Update teacher
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

    // Process arrays if they are provided as strings
    const updates = {
      name,
      email,
      contact_number,
      qualification,
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

    const updatedTeacher = await Teacher.findOneAndUpdate(
      { _id: req.params.id, tuition_admin_id: req.admin._id },
      updates,
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({
      message: "Teacher updated successfully",
      data: updatedTeacher,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Error updating teacher",
      error: error.message || error,
    });
  }
};

// Get all teachers
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find({ tuition_admin_id: req.admin._id });
    res.status(200).json({
      message: "Teachers retrieved successfully",
      data: teachers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving teachers",
      error: error.message || error,
    });
  }
};

// Get teacher by ID
const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({
      _id: req.params.id,
      tuition_admin_id: req.admin._id,
    });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({
      message: "Teacher retrieved successfully",
      data: teacher,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving teacher",
      error: error.message || error,
    });
  }
};

// Delete teacher - Only accessible by the tuition admin who created the teacher
const deleteTeacher = async (req, res) => {
  try {
    // Check if teacher exists and belongs to the current admin
    const teacher = await Teacher.findOne({
      _id: req.params.id,
      tuition_admin_id: req.admin._id
    });

    if (!teacher) {
      return res.status(404).json({ 
        message: "Teacher not found or you don't have permission to delete this teacher" 
      });
    }

    // Delete the teacher
    await Teacher.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Teacher deleted successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error deleting teacher",
      error: error.message
    });
  }
};

export {
  createTeacher,
  updateTeacher,
  getAllTeachers,
  getTeacherById,
  deleteTeacher,
};