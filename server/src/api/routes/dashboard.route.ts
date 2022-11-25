import express from "express";
import myParties from "./dashboard/myParties.route";
const router = express.Router();

router.use("/my-parties", myParties);

export default router;
