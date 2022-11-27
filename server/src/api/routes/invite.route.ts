import express from "express";
import { addGuest, checkIfPartyExists } from "../controllers/invite.controller";
const router = express.Router();

router.post("/", checkIfPartyExists);
router.post("/guest", addGuest);

export default router;
