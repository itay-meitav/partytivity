import express from "express";
import {
  createNewParty,
  getServicesList,
} from "../../controllers/dashboard/newParty.controller";
import { isAuthenticated } from "../../middlewares/auth";
const router = express.Router();

router.post("/", isAuthenticated, createNewParty);
router.post("/services", getServicesList);

export default router;
