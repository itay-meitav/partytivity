import path from "path";
require("dotenv").config({ path: path.resolve(__dirname + "/../../../.env") });
import fs from "fs/promises";
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendConfirmationEmail(
  name: string,
  email: string,
  token: string
) {
  const content = await fs.readFile(
    __dirname + "/EmailStaticFiles/verify.html",
    "utf8"
  );

  const html = content.replaceAll(
    "{{TOKEN_LINK}}",
    `http://localhost:5000/auth/confirm/${token}`
  );

  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: `"Partytivity 🎉" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Please confirm your account",
    html,
  });

  console.log("Message sent: %s", info.messageId);
}

export async function sendResetEmail(
  name: string,
  email: string,
  token: string
) {
  const content = await fs.readFile(
    __dirname + "/EmailStaticFiles/reset.html",
    "utf8"
  );

  const html = content.replaceAll(
    "{{TOKEN_LINK}}",
    `http://localhost:5000/auth/reset/${token}}`
  );

  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: `"Partytivity 🎉" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset your password",
    html,
  });

  console.log("Message sent: %s", info.messageId);
}
