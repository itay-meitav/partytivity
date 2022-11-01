import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  checkIfPartyExists,
  countUserParties,
  getUserParties,
} from "../../db/dashboard/my-parties";
import authConfig from "../auth/auth.config";
import { isAuthenticated } from "../auth/authMiddle";
import newParty from "./new-party";
const router = express.Router();

router.use("/new", newParty);

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const token = req.cookies.token;
    const { id } = jwt.verify(token, authConfig.secret) as JwtPayload;
    const limit = Number(req.query.limit) || 5;
    const offset = Number(req.query.offset) || 0;
    const orderBy = req.query.orderBy || undefined;
    const parties = await getUserParties(id, limit, offset, orderBy);
    const count = await countUserParties(id);
    if (!parties) {
      return res.status(404).json({
        success: false,
        message: "This user doesn't own any party",
      });
    }
    res.json({
      parties: parties,
      count: count,
      success: true,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "You are not authorized to do that",
    });
  }
});

router.get("/:partyTitle", isAuthenticated, async (req, res) => {
  const partyTitle = req.params.partyTitle.replaceAll("-", " ");
  const check = await checkIfPartyExists(partyTitle);
  if (!check) {
    return res.status(404).json({
      success: false,
      message: "Party with that title was not found",
    });
  }
  return res.json({
    success: true,
  });
});
export default router;
