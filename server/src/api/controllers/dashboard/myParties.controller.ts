import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import authConfig from "src/api/config/auth.config";
import {
  checkIfPartyExists,
  countUserParties,
  getUserParties,
} from "src/database/dashboard/my-parties";
import { getPartyDetailsByID } from "src/database/party-invite/party-invite";

export const getUserPartiesList = async (req: Request, res: Response) => {
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
};

export const getUserParty = async (req: Request, res: Response) => {
  try {
    const { id } = jwt.verify(
      req.cookies.token,
      authConfig.secret
    ) as JwtPayload;
    const partyTitle = req.params.partyTitle.replaceAll("-", " ");
    const check = await checkIfPartyExists(partyTitle, id);
    const partyDetails = await getPartyDetailsByID(check.id);
    if (!check) {
      return res.status(404).json({
        success: false,
        message: "Party with that title was not found",
      });
    }
    return res.json({
      success: true,
      partyDetails: partyDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
