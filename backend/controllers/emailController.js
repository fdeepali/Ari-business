import nodemailer from "nodemailer";
import validator from "validator";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.GMAIL_APP_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});


export const sendEmail = async ({ to, from, subject, text, html }) => {
  if (!validator.isEmail(to) || !validator.isEmail(from)) {
    throw new Error("Invalid email");
  }

  const mailOptions = {
    from,
    to,
    subject,
    text, // Plain text fallback
  };

  if (html) {
    mailOptions.html = html;
  } else {
    mailOptions.html = `<pre>${text}</pre>`;
  }

  return transporter.sendMail(mailOptions);
};