if (process.env.MODE_ENV != "production") {
  require("dotenv").config();
}

import path from "path";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
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
