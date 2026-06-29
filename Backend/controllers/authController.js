const bcrypt = require("bcryptjs");
const { getDB } = require('../config/db');
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");
const jwt = require('jsonwebtoken');
const { getJwtSecret } = require("../utils/jwt");
const generateOTP = require("../utils/otp");
 const sendEmail = require("../utils/sendEmail");
const { ObjectId } = require('mongodb');

const loginUser = async (req, res, next) => {
  try {

    const db = getDB();

    const { username, password } = req.body;

    if (
      username === (process.env.ADMIN_USERNAME || "admin") &&
      password === (process.env.ADMIN_PASSWORD || "admin123")
    ) {
      const adminUser = {
        _id: "admin",
        name: "Admin",
        username,
        email: process.env.ADMIN_EMAIL || "admin@women-salon.local",
        role: "admin"
      };

      return res.json({
        success: true,
        accessToken: generateAccessToken(adminUser),
        refreshToken: generateRefreshToken(adminUser),
        user: {
          id: adminUser._id,
          name: adminUser.name,
          username: adminUser.username,
          email: adminUser.email,
          role: adminUser.role
        }
      });
    }

    const user = await db.collection("users").findOne({ username });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid username or password"
      });
    }

    // 🔐 Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid username or password"
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await db.collection("users").updateOne(
      { _id: user._id },
      { $set: { refreshToken } }
    );

    res.json({
      success: true,
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    next(error);
  }
};

// ✅ CREATE REGISTER

const createRegister = async (req, res, next) => {
  try {

    const db = getDB();
console.log("Create user with data:",req.body);//log incoming data
    const {
      name,
      username,
      email,
      password,
      phone,
      gender,
      address,
      pincode,
    } = req.body;

    // 🔎 Check if username already exists
    const existingUsername = await db.collection("users").findOne({ username });

    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already exists"
      });
    }

    // 🔎 Check if email already exists
    const existingEmail = await db.collection("users").findOne({ email,status:'Active'});
    
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      });
    }
     await db.collection("users").deleteMany({ email,status:'Inactive'});

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const newRegister = {
      name,
      username,
      email,
      password: hashedPassword,
      role: "user",
      phone,
      gender,
      emailOtp: otp,
      address,
      pincode,
      status: "Inactive",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await db.collection("users").insertOne(newRegister);

await sendEmail(
 email,
  "Verify Your Email 🔐",
  `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Email Verification</h2>

      <p>Hello ${name},</p>

      <p>Your OTP for verification is:</p>

      <h1 style="
        letter-spacing: 5px;
        color: #2c3e50;
        background: #f4f4f4;
        display: inline-block;
        padding: 10px 20px;
        border-radius: 8px;
      ">
        ${otp}
      </h1>

      <p>This OTP is valid for <b>5 minutes</b>.</p>

      <p>If you did not request this, please ignore this email.</p>

      <br/>
      <p>Thanks,<br/>Your Team</p>
    </div>
  `
);
    res.status(201).json({
      success: true,
      message: "User registered successfully"
    });

  } catch (error) {
    next(error);
  }
};
// ✅ VERIFY OTP
const verifyOTP = async (req, res) => {
  try {
    const db = getDB();
    const { email, otp } = req.body;

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ FIX: correct field name + safe compare
    if (String(user.emailOtp) !== String(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // ✅ Update user after success
    await db.collection("users").updateOne(
      { email },
      {
        $set: { status: "Active" },
        $unset: { emailOtp: "" } // better than empty string
      }
    );
console.log("Entered OTP:", otp);
console.log("DB OTP:", user.emailOtp);
    res.json({
      success: true,
      message: "Email verified successfully"
    });

  } catch (err) {
    console.error("VERIFY OTP ERROR:", err);
    res.status(500).json({ message: "Error verifying OTP" });
  }
};

// ✅ REFRESH TOKEN
const refreshToken = async (req, res) => {
  try {

    const db = getDB();
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token required"
      });
    }    
    const decoded = jwt.verify(refreshToken, getJwtSecret());

    if (decoded.id === "admin") {
      const adminUser = {
        _id: "admin",
        email: process.env.ADMIN_EMAIL || "admin@women-salon.local",
        role: "admin"
      };

      return res.json({
        success: true,
        accessToken: generateAccessToken(adminUser)
      });
    }
    
    
    const user = await db.collection("users").findOne({
      _id: new ObjectId(decoded.id),
      refreshToken
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token"
      });
    }

    const accessToken = generateAccessToken(user);

    res.json({
      success: true,
      accessToken
    });

  } catch (error) {    
    res.status(401).json({
      success: false,
      message: "Invalid refresh token"
    });
  }
};

module.exports = {
  createRegister,
  loginUser,
  verifyOTP,
  refreshToken
};
