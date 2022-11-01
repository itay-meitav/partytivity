import express from "express";
import myParties from "./my-parties";
const router = express.Router();

router.use("/my-parties", myParties);

export default router;
