import express, { NextFunction, Request, Response } from "express";
import { isAuthenticated } from "../auth/authMiddle";
const router = express.Router();

router.post("/", isAuthenticated, async (req, res) => {});

export default router;
