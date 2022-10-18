require("dotenv").config();
import RestApi from "./api/index";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authConfig from "./api/auth/auth.config";
import jwt from "jsonwebtoken";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(cookieParser());
app.use("/api", RestApi);

app.get(["/login", "/register"], (req: Request, res: Response) => {
  if (req.cookies.token) {
    jwt.verify(req.cookies.token, authConfig.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: false });
      }
      return res.json({ success: true });
    });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app on http://localhost:${port}`);
});

app.use((req, res) => {
  res.status(404).json({
    message: "Requested resource was not found on this server",
    success: false,
  });
});

//This will output unhandled Rejection
process.on("unhandledRejection", (error: Error, promise) => {
  console.log(`unhandled Rejection: ${error} \n ErrorStack: ${error.stack}`);
});

//This will output unhandled Exception
process.on("uncaughtException", (error: Error, promise) => {
  console.log(`uncaught Exception: ${error} \n ErrorStack: ${error.stack}`);
});
