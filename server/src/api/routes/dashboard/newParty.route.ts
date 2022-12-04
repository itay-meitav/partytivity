import express from "express";
import {
  createNewParty,
  getServicesList,
} from "../../controllers/dashboard/newParty.controller";
import { isAuthenticated } from "../../middleware/auth.middleware";
const router = express.Router();

router.post("/", isAuthenticated, createNewParty);
router.post("/services", getServicesList);

export default router;
