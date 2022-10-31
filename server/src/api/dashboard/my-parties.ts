import express, { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  addParty,
  countUserParties,
  getServiceIDByTitle,
  getServicesByType,
  getUserParties,
} from "../../db/dashboard/my-parties";
import authConfig from "../auth/auth.config";
import { isAuthenticated } from "../auth/authMiddle";
const router = express.Router();

router.get("/", isAuthenticated, async (req: Request, res: Response) => {
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

router.post("/new", isAuthenticated, async (req: Request, res: Response) => {
  const token = req.cookies.token;
  const { id } = jwt.verify(token, authConfig.secret) as JwtPayload;
  let servicesID = {
    location_service: null,
    music_service: null,
    food_service: null,
    entertainment_service: null,
    general_service: null,
  };
  if (req.body.services) {
    const filteredPartyServices = Object.entries(req.body.services).filter(
      ([serviceKey, serviceValue]) => serviceValue !== ""
    );
    const serviceFunctions = filteredPartyServices.map(
      async ([serviceKey, serviceValue]: any) => {
        const tableName = serviceKey
          .toLowerCase()
          .replace("service", "_service");
        return await getServiceIDByTitle(serviceValue, tableName);
      }
    );
    try {
      const servicesIDReq = await Promise.all(serviceFunctions);
      servicesID = Object.assign(servicesID, ...servicesIDReq);
    } catch (error) {
      return res.status(404).json({
        message:
          "One or more of the services you specified does not exist in the system",
        success: false,
      });
    }
  }
  try {
    addParty({
      title: req.body.title,
      description: req.body.description || "",
      date: req.body.date,
      ownerId: Number(id),
      locationID: servicesID.location_service,
      musicID: servicesID.music_service,
      foodID: servicesID.food_service,
      entertainmentID: servicesID.entertainment_service,
      generalID: servicesID.general_service,
      photos: req.body.photos || [],
    }).then((partyToken) => {
      return res.json({ success: true, partyToken: partyToken });
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "There is an error creating the party right now. Try again later.",
      success: false,
    });
  }
});

router.post("/new/services", async (req, res) => {
  try {
    const serviceType = req.body.serviceType
      .split(/(?=[A-Z])/)
      .join("_")
      .toLowerCase();
    const data = await getServicesByType(serviceType);
    return res.json({ services: data, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
});

export default router;
