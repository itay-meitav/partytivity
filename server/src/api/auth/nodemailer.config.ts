import path from "path";
require("dotenv").config({ path: path.resolve(__dirname + "/../../../.env") });
import fs from "fs/promises";
const cheerio = require("cheerio");
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

  let $ = cheerio.load(content);
  $('div:contains("Verify Email")')
    .find("a")
    .attr("href")
    .replace(`http://localhost:5000/auth/confirm/${token}}`);

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
    to: "gibogo3508@pahed.com",
    subject: "Please confirm your account",
    html: $.html(),
  });

  console.log("Message sent: %s", info.messageId);
}

(async () =>
  await sendConfirmationEmail("itay", "gibogo3508@pahed.com", "bla")
    .then(() => console.log("done"))
    .catch((err) => console.log(err)))();
