import Attendance from "../Model/attendanceModel.js";
import Student from "../Model/studentModel.js";
import Teacher from "../Model/teacherModel.js";
 
const addAttendance = async (req, res) => {
  try {
    const { students, teacher_id, tuition_admin_id, date, createdByModel } = req.body;
    const user = req.user;

    if (!Array.isArray(students) || students.length === 0) {
      return res.status(400).json({ message: "Students array is required and cannot be empty" });
    }

    if (user.role === "Teacher") {
      const teacher = await Teacher.findById(user._id);
      if (!teacher || teacher.createdBy.toString() !== tuition_admin_id) {
        return res.status(403).json({ message: "Teacher not authorized for this tuition admin" });
      }

      if (!requestedDate.isSame(today)) {
        return res.status(400).json({ message: "Teachers can only add attendance for today's date" });
      }
    }
    
    const attendanceRecords = [];
    const errors = [];

    for (const studentEntry of students) {
      const { student_id, status } = studentEntry;

      try {
        const student = await Student.findById(student_id);
        if (!student) {
          errors.push({ student_id, message: "Student not found" });
          continue;
        }

        if (student.createdBy.toString() !== tuition_admin_id) {
          errors.push({ student_id, message: "Student does not belong to this tuition admin" });
          continue;
        }

        let AttendanceId = (teacher_id && teacher_id.length > 0) ? teacher_id : tuition_admin_id;

        const attendance = new Attendance({
          date,
          student_id,
          teacher_id: user.role === "Teacher" ? user._id : teacher_id || undefined,
          tuition_admin_id,
          status,
          createdBy: AttendanceId,
          createdByModel,
        });

        await attendance.save();
        attendanceRecords.push(attendance);

      } catch (err) {
        errors.push({ student_id, message: err.message });
      }
    }

    res.status(207).json({
      message: "Attendance processed",
      success: attendanceRecords,
      errors: errors,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { addAttendance };
