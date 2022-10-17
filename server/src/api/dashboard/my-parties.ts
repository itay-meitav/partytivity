import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  addParty,
  getServiceIDByName,
  getServicesByType,
  getUserParties,
} from "../../db/dashboard/my-parties";
import authConfig from "../auth/auth.config";
import { isAuthenticated } from "../auth/authMiddle";
const router = express.Router();
interface JWTData {
  id: any;
}

router.get("/", isAuthenticated, async (req: Request, res: Response) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, authConfig.secret);
  const limit = Number(req.query.limit) || 20;
  const offset = Number(req.query.offset) || 0;
  const orderBy = req.query.orderBy ? req.query.orderBy.toString() : undefined;
  const parties = await getUserParties(
    (decoded as JWTData).id,
    limit,
    offset,
    orderBy
  );
  res.json({
    parties: parties,
    success: true,
  });
});

router.post("/new", isAuthenticated, async (req: Request, res: Response) => {
  const serviceFunctions = Object.entries(req.body.services).map(
    async ([serviceKey, serviceValue]: any) => {
      const tableName = serviceKey.toLowerCase().replace("service", "_service");
      return await getServiceIDByName(serviceValue, tableName);
    }
  );
  const servicesIDReq = await Promise.all(serviceFunctions);
  const servicesID = Object.assign({}, ...servicesIDReq);
  const token = req.cookies.token;
  const decoded = jwt.verify(token, authConfig.secret);
  try {
    addParty({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      ownerId: (decoded as JWTData).id,
      locationID: servicesID.location_service,
      musicID: servicesID.music_service,
      foodID: servicesID.food_service,
      entertainmentID: servicesID.entertainment_service,
      generalID: servicesID.general_service,
    }).then((partyToken) => {
      return res.json({ success: true, partyToken: partyToken });
    });
  } catch (error) {
    return res.status(500).json({ message: error, success: false });
  }
});

router.post("/new/services", async (req, res) => {
  try {
    const serviceType = req.body.serviceType.toLowerCase().replace(" ", "_");
    const data = await getServicesByType(serviceType);
    return res.json({ services: data, success: true });
  } catch (error) {
    return res.status(500).json({ message: error, success: false });
  }
});

export default router;
