require("dotenv").config();
import RestApi from "./api/index";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use("/api", RestApi);
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app on http://localhost:${port}`);
});
