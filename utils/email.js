const nodemailer = require("nodemailer");

const sendMail = async function (options) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const messageObj = {
    from: "Apartment management system <info@apartment.co.ke>", // sender address
    to: options.email,
    subject: options.subject,
    text: options.message, // plain text body
    // html: "<b>Click me</b>", // html body
  };

  await transporter.sendMail(messageObj);
};

module.exports = sendMail;
