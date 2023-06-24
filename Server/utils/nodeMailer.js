const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");  

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_NAME,
    pass: process.env.EMAIL_SECRET
  }
});

const sendMail = asyncHandler(async (email, html) => {
  const mailOptions = {
    from: '"Trang Web Bán Hàng EriDev" eridev0409@gmail.com',
    to: email,
    subject: "Forgot Password",
    html: html
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    throw new Error("Failed to send email");
  }
});

module.exports = sendMail;
