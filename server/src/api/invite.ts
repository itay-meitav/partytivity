import express from "express";
import jwt from "jsonwebtoken";
import {
  addGuestToParty,
  getPartyDetailsByID,
} from "../db/dashboard/my-parties";
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

router.post("/guest", async (req, res) => {
  try {
    const partyID = jwt.verify(req.body.partyToken, authConfig.secret);
    await addGuestToParty({
      partyID: partyID.toString(),
      name: req.body.name,
      phone: req.body.phone,
      isComing: req.body.isComing,
      comment: req.body.comment,
    });
    return res.json({
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
});

export default router;
