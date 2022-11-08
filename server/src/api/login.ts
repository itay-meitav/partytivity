import express from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { changeUserPass, checkIfUserExist, checkUserEmail } from "../db/users";
import authConfig from "./auth/auth.config";
import {
  sendConfirmationEmail,
  sendResetEmail,
} from "./auth/nodemailer.config";
const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password, location } = req.body;
  const cookie = req.cookies.verify;
  const check = await checkIfUserExist(username);
  if (check) {
    if (check.status == "active") {
      return bcrypt.compare(password, check.password, async (err, result) => {
        if (result) {
          const token = jwt.sign({ id: check.id }, authConfig.secret, {
            expiresIn: "24h",
          });
          return res
            .cookie("token", token, {
              expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
              httpOnly: true,
              sameSite: "none",
              secure: true,
            })
            .json({
              success: true,
            });
        } else {
          return res.status(401).json({
            message: "The password entered is incorrect",
            success: false,
          });
        }
      });
    } else if (!cookie) {
      const token = jwt.sign({ email: check.email }, authConfig.secret, {
        expiresIn: "24h",
      });
      await sendConfirmationEmail(check.email, token, location);
      return res
        .cookie(
          "verify",
          jwt.sign({ name: check.name }, authConfig.secret, {
            expiresIn: "10m",
          }),
          {
            expires: new Date(Date.now() + 1000 * 60 * 10),
            httpOnly: true,
            sameSite: "none",
            secure: true,
          }
        )
        .status(401)
        .json({
          message: "A verification email has been sent to you",
          success: false,
        });
    }
    return res.status(401).json({
      message: "Please complete the email verification process",
      success: false,
    });
  } else {
    return res.status(401).json({
      message: "The username entered is incorrect",
      success: false,
    });
  }
});

router.post("/reset", async (req, res) => {
  const { email, location } = req.body;
  const check = await checkUserEmail(email);
  if (check) {
    const token = jwt.sign({ email: check.email }, authConfig.secret, {
      expiresIn: "10m",
    });
    await sendResetEmail(email, token, location);
    return res
      .cookie(
        "reset",
        jwt.sign({ id: check.id }, authConfig.secret, {
          expiresIn: "10m",
        }),
        {
          expires: new Date(Date.now() + 1000 * 60 * 10),
          httpOnly: true,
          sameSite: "none",
          secure: true,
        }
      )
      .json({
        message: "Please check your email",
        success: true,
      });
  }
  return res.status(401).json({
    message: "No user associated with this email",
    success: false,
  });
});

router.get("/reset/new/:token", async (req, res) => {
  const token = req.params.token;
  const cookie = req.cookies.reset;
  if (token && cookie) {
    try {
      jwt.verify(token, authConfig.secret);
      return res.json({
        success: true,
      });
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized!", success: false });
    }
  }
  return res.status(404).json({
    success: false,
  });
});

router.post("/reset/new/:token", async (req, res) => {
  const token = req.params.token;
  const password = req.body.password;
  const cookie = req.cookies.reset;
  if (cookie) {
    try {
      const { email } = jwt.verify(token, authConfig.secret) as JwtPayload;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 12);
        await changeUserPass({
          email: email,
          password: hashedPassword,
        });
        return res
          .clearCookie("reset")
          .json({ message: "Password changed", success: true });
      } else {
        return res.status(401).json({
          message: "make sure to send all the necessary fields",
          success: false,
        });
      }
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized!", success: false });
    }
  }
  return res.status(401).json({ message: "Unauthorized!", success: false });
});

router.get("/logout", async (req, res) => {
  return res.clearCookie("token").json({ success: true });
});

export default router;
