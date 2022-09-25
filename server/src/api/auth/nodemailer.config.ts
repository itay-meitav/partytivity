import path from "path";
require("dotenv").config({ path: path.resolve(__dirname + "/../../.env") });
import fs from "fs/promises";
const cheerio = require("cheerio");
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
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
      from: process.env.USER,
      to: email,
      subject: "Please confirm your account",
      html: newHtml,
    })
    .catch((err) => console.log(err));
}
