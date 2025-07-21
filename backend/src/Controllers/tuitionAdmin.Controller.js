import TuitionAdmin from "../Model/tuitionAdmin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register Tuition Admin
const registerTuitionAdmin = async (req, res) => {
  try {
    const { name, email, password, contact_number, institution_name } =
      req.body;

    const adminExists = await TuitionAdmin.findOne({
      $or: [{ email }, { contact_number }],
    });
    if (adminExists) {
      console.log("Admin with this email or contact number already exists");
      return res
        .status(409)
        .json({
          message: "Admin with this email or contact number already exists",
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const tuitionAdmin = await TuitionAdmin.create({
      name,
      email,
      password: hashedPassword,
      contact_number,
      institution_name,
    });

    if (tuitionAdmin) {
      res.status(201).json({
        _id: tuitionAdmin._id,
        name: tuitionAdmin.name,
        email: tuitionAdmin.email,
        contact_number: tuitionAdmin.contact_number,
        token: generateToken(tuitionAdmin._id),
      });
    } else {
      res.status(500).json({ message: "Failed to create admin" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Login Tuition Admin
const loginTuitionAdmin = async (req, res) => {
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

    const tuitionAdmin = await TuitionAdmin.findOne({
      $or: [{ email }, { contact_number }],
    });
    if (!tuitionAdmin) {
      return res
        .status(401)
        .json({ message: "Invalid email/contact number or password" });
    }

    const isMatch = await bcrypt.compare(password, tuitionAdmin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid email/contact number or password" });
    }

    res.status(200).json({
      _id: tuitionAdmin._id,
      name: tuitionAdmin.name,
      email: tuitionAdmin.email,
      contact_number: tuitionAdmin.contact_number,
      token: generateToken(tuitionAdmin._id),
      status: tuitionAdmin.status,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Tuition Admin Profile
const getTuitionAdminProfile = async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(req.admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Tuition Admin Profile
const updateTuitionAdminProfile = async (req, res) => {
  try {
    const { name, email, password, contact_number, institution_name, address } =
      req.body;
    const tuitionAdmin = await TuitionAdmin.findById(req.admin._id);

    if (!tuitionAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    tuitionAdmin.name = name || tuitionAdmin.name;
    tuitionAdmin.email = email || tuitionAdmin.email;
    tuitionAdmin.contact_number = contact_number || tuitionAdmin.contact_number;
    tuitionAdmin.institution_name =
      institution_name || tuitionAdmin.institution_name;
    tuitionAdmin.address = address || tuitionAdmin.address;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      tuitionAdmin.password = await bcrypt.hash(password, salt);
    }

    tuitionAdmin.updatedAt = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    await tuitionAdmin.save();

    res.status(200).json({
      _id: tuitionAdmin._id,
      name: tuitionAdmin.name,
      email: tuitionAdmin.email,
      token: generateToken(tuitionAdmin._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Tuition Admin
const deleteTuitionAdmin = async (req, res) => {
  try {
    const tuitionAdmin = await TuitionAdmin.findById(req.admin._id);
    if (!tuitionAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    await TuitionAdmin.findByIdAndDelete(req.admin._id);
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Find user by ID
    const user = await TuitionAdmin.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Old password is incorrect" });

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Save user with new password
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const tutionAdminStatusUpdate = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Active", "Blocked"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status value. Must be either 'Active' or 'Blocked'",
      });
    }

    const user = await TuitionAdmin.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Tution Admin not found" });
    }

    res.status(200).json({
      message: `Tution Admin ${
        status === "Blocked" ? "Blocked" : "Activated"
      } successfully`,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update Tution Admin status",
      error: error.message,
    });
  }
};

export {
  registerTuitionAdmin,
  loginTuitionAdmin,
  getTuitionAdminProfile,
  updateTuitionAdminProfile,
  deleteTuitionAdmin,
  changePassword,
  tutionAdminStatusUpdate,
};
