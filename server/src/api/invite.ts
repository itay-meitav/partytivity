import express from "express";
import jwt from "jsonwebtoken";
import { getPartyDetailsByID } from "src/db/dashboard/my-parties";
import authConfig from "./auth/auth.config";
const router = express.Router();

router.get("/:partyToken", async (req, res) => {
  const partyID = jwt.verify(req.params.partyToken, authConfig.secret);
  if (!partyID) {
    return res
      .status(404)
      .json({ message: "There is no party with that ID", success: false });
  }
  const partyDetails = await getPartyDetailsByID(partyID);
  return res.json({
    partyDetails: partyDetails,
    success: true,
  });
});

export default router;
