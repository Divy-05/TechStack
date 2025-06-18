import Attendance from "../Model/attendanceModel.js";

const getStartOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const addAttendance = async (req, res) => {
  try {
    const { date, students, teacher_id, tuition_admin_id } = req.body;

    if (!Array.isArray(students) || students.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Students array is required with at least one student.",
      });
    }

    const attendanceDate = getStartOfDay(date);
    const today = getStartOfDay(new Date());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    let createdBy, createdByModel;

    if (teacher_id) {
      if (attendanceDate.getTime() !== today.getTime()) {
        return res.status(400).json({
          success: false,
          message: "Teacher can only add attendance for today.",
        });
      }
      createdBy = teacher_id;
      createdByModel = "Teacher";
    } else if (tuition_admin_id) {
      if (
        attendanceDate.getTime() !== today.getTime() &&
        attendanceDate.getTime() !== yesterday.getTime()
      ) {
        return res.status(400).json({
          success: false,
          message: "Tuition admin can only add attendance for today or yesterday.",
        });
      }
      createdBy = tuition_admin_id;
      createdByModel = "TuitionAdmin";
    } else {
      return res.status(400).json({
        success: false,
        message: "Either teacher_id or tuition_admin_id is required.",
      });
    }

    if (attendanceDate > today) {
      return res.status(400).json({
        success: false,
        message: "Cannot add attendance for a future date.",
      });
    }

    const attendanceRecords = [];

    for (const student of students) {
      const { student_id, status } = student;

      if (!student_id || !status) {
        return res.status(400).json({
          success: false,
          message: "Each student entry must have student_id and status.",
        });
      }

      attendanceRecords.push({
        date: attendanceDate,
        student_id,
        teacher_id,
        tuition_admin_id,
        status,
        createdBy,
        createdByModel,
      });
    }

    const savedRecords = await Attendance.insertMany(attendanceRecords);

    res.status(201).json({
      success: true,
      message: "Attendance added successfully for multiple students.",
      data: savedRecords,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Error while adding attendance",
      error: error.message,
    });
  }
};

const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, status, teacher_id, tuition_admin_id } = req.body;

    const attendance = await Attendance.findById(id);
    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found.",
      });
    }

    const attendanceDate = getStartOfDay(date);
    const today = getStartOfDay(new Date());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (teacher_id) {
      if (attendanceDate.getTime() !== today.getTime()) {
        return res.status(400).json({
          success: false,
          message: "Teacher can only update attendance for today.",
        });
      }
    } else if (tuition_admin_id) {
      if (
        attendanceDate.getTime() !== today.getTime() &&
        attendanceDate.getTime() !== yesterday.getTime()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Tuition admin can only update attendance for today or yesterday.",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Either teacher_id or tuition_admin_id is required.",
      });
    }

    if (attendanceDate > today) {
      return res.status(400).json({
        success: false,
        message: "Cannot update attendance for a future date.",
      });
    }

    attendance.date = attendanceDate;
    attendance.status = status;
    await attendance.save();

    res.status(200).json({
      success: true,
      message: "Attendance updated successfully.",
      data: attendance,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Error while updating attendance",
      error: error.message,
    });
  }
};

export {
  addAttendance,
  updateAttendance
}