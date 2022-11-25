import express from "express";
import {
  getUserPartiesList,
  getUserParty,
} from "src/api/controllers/dashboard/myParties.controller";
import { isAuthenticated } from "../../middlewares/auth";
import newParty from "./newParty.route";
const router = express.Router();

router.use("/new", newParty);
router.get("/", isAuthenticated, getUserPartiesList);
router.get("/:partyTitle", isAuthenticated, getUserParty);

export default router;
