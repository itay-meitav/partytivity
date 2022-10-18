import express from "express";
import jwt from "jsonwebtoken";
import { getPartyDetailsByID } from "../db/dashboard/my-parties";
import authConfig from "./auth/auth.config";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const partyID = jwt.verify(req.body.partyToken, authConfig.secret);
    const partyDetails = await getPartyDetailsByID(partyID);
    return res.json({
      partyDetails: partyDetails,
      success: true,
    });
  } catch (err) {
    return res
      .status(404)
      .json({ message: "There is no party with that ID", success: false });
  }
});

export default router;
