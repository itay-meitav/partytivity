import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  addGuestToParty,
  getPartyDetailsByID,
} from "../../database/dashboard/partyInvite";
import authConfig from "../config/auth.config";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { id } = jwt.verify(
      req.body.partyToken,
      authConfig.secret
    ) as JwtPayload;
    const partyDetails = await getPartyDetailsByID(id);
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
    const { id } = jwt.verify(
      req.body.partyToken,
      authConfig.secret
    ) as JwtPayload;
    await addGuestToParty({
      partyID: id.toString(),
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
