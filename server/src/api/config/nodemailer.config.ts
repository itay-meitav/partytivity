import envConfig from "../config/environment.config";
import fs from "fs/promises";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: envConfig.email.EMAIL_USER,
    pass: envConfig.email.EMAIL_PASS,
  },
});

export async function sendConfirmationEmail(
  email: string,
  token: string,
  location: string
) {
  const content = await fs.readFile(
    __dirname + "/../assets/verify.html",
    "utf8"
  );
  const html = getEmailBody("confirm", content, token, location);

  let info = await transporter.sendMail({
    from: `"Partytivity 🎉" <${envConfig.email.EMAIL_USER}>`,
    to: email,
    subject: "Please confirm your account",
    html: html,
  });
  console.log("Message sent: %s", info.messageId);
}

export async function sendResetEmail(
  email: string,
  token: string,
  location: string
) {
  const content = await fs.readFile(
    __dirname + "/../assets/reset.html",
    "utf8"
  );
  const html = getEmailBody("reset", content, token, location);

  let info = await transporter.sendMail({
    from: `"Partytivity 🎉" <${envConfig.email.EMAIL_USER}>`,
    to: email,
    subject: "Reset your password",
    html: html,
  });

  console.log("Message sent: %s", info.messageId);
}

function getEmailBody(
  emailType: string,
  content: string,
  token: string,
  location: string
) {
  const mapObj = {
    TOKEN_LINK:
      emailType == "confirm"
        ? `${location}/auth/confirm/${token}`
        : `${location}/login/reset/new/${token}`,
    EMAIL_ENV: envConfig.email.EMAIL_USER,
    SITE_LINK: location,
  };
  const regex = new RegExp(Object.keys(mapObj).join("|"), "gi");
  const html = content.replace(regex, (matched) => {
    return mapObj[matched];
  });
  return html;
}
