const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ========================================
// SIGN UP
// ========================================
const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      registerNumber,
      department,
      year,
      section,
    } = req.body;

    // ========================================
    // REQUIRED FIELDS
    // ========================================
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password and role are required",
      });
    }

    // ========================================
    // VALIDATE ROLE
    // ========================================
    if (!["student", "faculty"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be student or faculty",
      });
    }

    // ========================================
    // STUDENT VALIDATION
    // ========================================
    if (role === "student") {
      if (!registerNumber) {
        return res.status(400).json({
          success: false,
          message: "Register number is required",
        });
      }

      if (!department) {
        return res.status(400).json({
          success: false,
          message: "Department is required",
        });
      }

      if (!year) {
        return res.status(400).json({
          success: false,
          message: "Year is required",
        });
      }

      if (!section) {
        return res.status(400).json({
          success: false,
          message: "Section is required",
        });
      }

      // Validate section
      if (!["A", "B", "C", "D"].includes(section)) {
        return res.status(400).json({
          success: false,
          message: "Section must be A, B, C or D",
        });
      }
    }

    // ========================================
    // FACULTY VALIDATION
    // ========================================
    if (role === "faculty") {
      if (!department) {
        return res.status(400).json({
          success: false,
          message: "Department is required",
        });
      }
    }

    // ========================================
    // CHECK EMAIL
    // ========================================
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    // ========================================
    // CHECK REGISTER NUMBER
    // ========================================
    if (role === "student") {
      const existingRegisterNumber = await User.findOne({
        registerNumber: registerNumber.trim(),
      });

      if (existingRegisterNumber) {
        return res.status(409).json({
          success: false,
          message: "Register number already exists",
        });
      }
    }

    // ========================================
    // HASH PASSWORD
    // ========================================
    const hashedPassword = await bcrypt.hash(password, 10);

    // ========================================
    // CREATE USER
    // ========================================
    const user = await User.create({
      name: name.trim(),

      email: email.toLowerCase().trim(),

      password: hashedPassword,

      role,

      registerNumber:
        role === "student"
          ? registerNumber.trim()
          : undefined,

      department: department.trim(),

      year:
        role === "student"
          ? Number(year)
          : undefined,

      section:
        role === "student"
          ? section
          : undefined,
    });

    // ========================================
    // CREATE JWT
    // ========================================
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }
    );

    // ========================================
    // RESPONSE
    // ========================================
    res.status(201).json({
      success: true,

      message: "Account created successfully",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        registerNumber: user.registerNumber,
        department: user.department,
        year: user.year,
        section: user.section,
      },
    });

  } catch (error) {
    console.error("SIGNUP ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================================
// SIGN IN
// ========================================
const signin = async (req, res) => {
  try {
    const {
      email,
      password,
      role,
    } = req.body;

    // ========================================
    // VALIDATION
    // ========================================
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Email, password and role are required",
      });
    }

    // ========================================
    // VALIDATE ROLE
    // ========================================
    if (!["student", "faculty"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    // ========================================
    // FIND USER
    // ========================================
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ========================================
    // CHECK ROLE
    // ========================================
    if (user.role !== role) {
      return res.status(401).json({
        success: false,
        message: `This account is registered as ${user.role}`,
      });
    }

    // ========================================
    // CHECK PASSWORD
    // ========================================
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ========================================
    // CREATE JWT
    // ========================================
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }
    );

    // ========================================
    // RESPONSE
    // ========================================
    res.json({
      success: true,

      message: "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        registerNumber: user.registerNumber,
        department: user.department,
        year: user.year,
        section: user.section,
      },
    });

  } catch (error) {
    console.error("SIGNIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================================
// EXPORT
// ========================================
module.exports = {
  signup,
  signin,
};