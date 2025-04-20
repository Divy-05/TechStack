import pseudoAdmin from "../Model/pseudoAdmin.js";
import TuitionAdmin from "../Model/tuitionAdmin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register Admin
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const adminExists = await pseudoAdmin.findOne({ email });
    if (adminExists) {
      return res.status(409).json({ message: "Admin already exists" }); // 409 Conflict
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await pseudoAdmin.create({ name, email, password: hashedPassword });

    if (admin) {
      res.status(201).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
      });
    } else {
      res.status(500).json({ message: "Failed to create admin" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login Admin
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await pseudoAdmin.findOne({ email });

    if (admin) {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (isMatch) {
        return res.status(200).json({
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          token: generateToken(admin._id),
        });
      }
    }

    res.status(401).json({ message: "Invalid email or password" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Admin Profile
const getAdminProfile = async (req, res) => {
  try {
    const admin = await pseudoAdmin.findById(req.admin._id);
    if (admin) {
      res.status(200).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      });
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Admin Profile
const updateAdminProfile = async (req, res) => {
  try {
    const admin = await pseudoAdmin.findById(req.admin._id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    admin.name = req.body.name || admin.name;
    admin.email = req.body.email || admin.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      PseudoAdmin.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedAdmin = await admin.save();
    res.status(200).json({
      _id: updatedAdmin._id,
      name: updatedAdmin.name,
      email: updatedAdmin.email,
      token: generateToken(updatedAdmin._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Tuition Admins (Main Admin Access)
const getAllTuitionAdmins = async (req, res) => {
  try {
    const tuitionAdmins = await TuitionAdmin.aggregate([
      { 
        $match: {} 
      },
      { 
        $project: 
          { password: 0 } 
        }, // Exclude password field
      { 
        $sort: 
          { createdAt: -1 } 
        },
      {   $group: 
        { 
          _id: "$role", 
          admins: { $push: "$$ROOT" }, 
          totalAdmins: { $sum: 1 } 
        } 
      },
      { 
        $unwind: "$admins" 
      },
      { 
        $replaceRoot: 
          { newRoot: "$admins" } 
      }
    ]);

    if (!tuitionAdmins.length) {
      return res.status(404).json({ message: "No tuition admins found" });
    }

    res.status(200).json(tuitionAdmins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Tuition PseudoAdmin (Main PseudoAdmin Access)
const deleteTuitionAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const tuitionAdmin = await TuitionAdmin.findById(id);
    if (!tuitionAdmin) {
      return res.status(404).json({ message: "Tuition admin not found" });
    }

    await TuitionAdmin.findByIdAndDelete(id);
    res.status(200).json({ message: "Tuition admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  updateAdminProfile,
  getAllTuitionAdmins,
  deleteTuitionAdmin,
};
