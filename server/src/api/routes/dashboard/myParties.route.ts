import express from "express";
import {
  getUserPartiesList,
  getUserParty,
} from "../../controllers/dashboard/myParties.controller";
import { isAuthenticated } from "../../middleware/auth.middleware";
import newParty from "./newParty.route";
const router = express.Router();

router.use("/new", newParty);
router.get("/", isAuthenticated, getUserPartiesList);
router.get("/:partyTitle", isAuthenticated, getUserParty);

export default router;
