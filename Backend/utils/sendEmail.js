const transporter = require("../config/mail");

const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM || `"WomenOGSalon" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
  }
};

module.exports = sendEmail;
