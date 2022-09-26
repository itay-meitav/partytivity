require("dotenv").config();
import RestApi from "./api/index";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api", RestApi);
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use((req, res, next) => {
  res.status(404).json({
    msg: "Requested resource was not found on this server",
    status: 404,
  });
  next();
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app on http://localhost:${port}`);
});
