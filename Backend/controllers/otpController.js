const { getDB } = require('../config/db');

// 🔹 Generate 6 digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ===============================
// ✅ SEND OTP
// ===============================
const sendOtp = async (req, res, next) => {
  try {
    const db = getDB();
    let { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    email = email.toLowerCase().trim();

    // Delete old OTP
    await db.collection("otps").deleteMany({ email });

    const otp = generateOTP();
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await db.collection("otps").insertOne({
      email,
      otp,
      expiry,
      createdAt: new Date()
    });

    console.log(`OTP for ${email}: ${otp}`);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully"
    });

  } catch (error) {
    next(error);
  }
};

// ===============================
// ✅ VERIFY OTP
// ===============================
const verifyOtp = async (req, res, next) => {
  try {
    const db = getDB();
    
   let { email, otp } = req.body;

email = email.toLowerCase().trim();
otp = otp.toString().trim();

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required"
      });
    }

    email = email.toLowerCase().trim();
    otp = otp.trim();

    // Find OTP record
    const record = await db.collection("otps").findOne({ email, otp });

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    // Check expiry
    if (new Date() > new Date(record.expiry)) {

      await db.collection("otps").deleteMany({ email });

      return res.status(400).json({
        success: false,
        message: "OTP expired"
      });
    }

    // Delete OTP after successful verification
    await db.collection("otps").deleteMany({ email });

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully"
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendOtp,
  verifyOtp
};