const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'axitap2044@gmail.com',
    pass: 'ieal keso ygsw oysi', // App password (NOT your Gmail password)
  },
});

module.exports = transporter;
