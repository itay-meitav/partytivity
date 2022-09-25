import fs from "fs/promises";
const cheerio = require("cheerio");
import nodemailer from "nodemailer";
import authConfig from "./auth.config";

const user = authConfig.user;
const pass = authConfig.pass;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

export async function sendConfirmationEmail(name, email, confirmationCode) {
  const content = await fs.readFile(
    __dirname + "/VerifyEmailStatic/index.html",
    "utf8"
  );
  const $ = cheerio.load(content);
  const newHtml = $('div:contains("Verify Email")')
    .find("a")
    .attr("href")
    .replace(`http://localhost:5000/confirm/${confirmationCode}}`);

  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: newHtml,
    })
    .catch((err) => console.log(err));
}
