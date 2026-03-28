const transporter = require("../config/mail");

const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"WomenOGSalon" <${'axitap2044@mail.com'}>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
  }
};

module.exports = sendEmail;