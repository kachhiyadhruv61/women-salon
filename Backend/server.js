import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let savedOtp = "";

/* SEND OTP */
app.post("/api/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    savedOtp = otp;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "yourgmail@gmail.com",
        pass: "your_app_password",
      },
    });

    await transporter.sendMail({
      from: "Organic Salon <yourgmail@gmail.com>",
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}`,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("OTP ERROR 👉", error);
    res.status(500).json({ success: false, message: "OTP failed" });
  }
});

/* VERIFY OTP */
app.post("/api/verify-otp", (req, res) => {
  const { otp } = req.body;

  if (otp === savedOtp) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

/* SAVE ORDER */
app.post("/api/orders", (req, res) => {
  console.log("ORDER RECEIVED 👉", req.body);
  res.status(201).json({ message: "Order saved successfully" });
});

/* TEST API */
app.get("/test", (req, res) => {
  res.send("API WORKING");
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
