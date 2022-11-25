import express from "express";
import { auth } from "../controllers/auth.controller";
const router = express.Router();

router.get("/confirm/:token", auth);

export default router;
