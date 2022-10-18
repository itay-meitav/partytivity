import authConfig from "../../api/auth/auth.config";
import { query as execQuery } from "../general";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function addParty(details: {
  title: string;
  description?: string;
  date: Date;
  ownerId: number;
  locationID?: number;
  musicID?: number;
  foodID?: number;
  entertainmentID?: number;
  generalID?: number;
  photos?: string[];
}) {
  const query = {
    text: `INSERT INTO parties(title, description, date, owner_id, location_id, music_id, food_id, entertainment_id, general_id, photos) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
    values: [
      details.title,
      details.description || "",
      details.date,
      Number(details.ownerId),
      details.locationID || null,
      details.musicID || null,
      details.foodID || null,
      details.entertainmentID || null,
      details.generalID || null,
      details.photos || [],
    ],
  };
  const res = await execQuery(query);
  const token = jwt.sign(res.rows[0].id, authConfig.secret);
  const tokenQuery = {
    text: `UPDATE parties SET invite_token = $1 WHERE id = $2 RETURNING *`,
    values: [token, res.rows[0].id],
  };
  const tokenRes = await execQuery(tokenQuery);
  return tokenRes.rows[0].invite_token;
}

export async function getUserParties(
  usernameId: string,
  limit: number,
  offset: number,
  orderBy?: string
) {
  const query = {
    text: `SELECT * FROM parties WHERE owner_id = $1 order by ${
      orderBy || "parties.id"
    }
    limit $2 offset $3`,
    values: [usernameId, limit, offset],
  };
  const res = await execQuery(query);
  return res.rows;
}

export async function getServiceIDByTitle(title: string, serviceType: string) {
  const query = {
    text: `SELECT id FROM ${serviceType} WHERE title = $1`,
    values: [title],
  };
  const res = await execQuery(query);
  return { [serviceType]: res.rows[0].id };
}

export async function getServiceTitleByID(
  serviceID: number,
  serviceType: string
) {
  const query = {
    text: `SELECT title FROM ${serviceType} WHERE id = $1`,
    values: [serviceID],
  };
  const res = await execQuery(query);
  return { [serviceType]: res.rows[0].title };
}

export async function getServicesByType(serviceType: string) {
  const query = {
    text: `SELECT title FROM ${serviceType}`,
  };
  const res = await execQuery(query);
  return res.rows;
}

export async function getOwnerNameByID(ownerID: number) {
  const query = {
    text: `SELECT name FROM users WHERE id = $1`,
    values: [ownerID],
  };
  const res = await execQuery(query);
  return res.rows[0].name;
}

export async function getPartyDetailsByID(partyID: string | JwtPayload) {
  const query = {
    text: `SELECT * FROM parties WHERE id = $1`,
    values: [partyID],
  };
  const res = await execQuery(query);
  const { entertainment_id, music_id, food_id, general_id, location_id } =
    res.rows[0];
  const partyServices = {
    entertainment: entertainment_id,
    music: music_id,
    food: food_id,
    general: general_id,
    location: location_id,
  };
  const serviceFunctions = Object.entries(partyServices).map(
    async ([serviceKey, serviceValue]: any) => {
      const tableName = serviceKey + "_service";
      return await getServiceTitleByID(serviceValue, tableName);
    }
  );
  const servicesIDReq = await Promise.all(serviceFunctions);
  const servicesTitles = Object.assign({}, ...servicesIDReq);
  const partyOwner = await getOwnerNameByID(res.rows[0].owner_id);
  return {
    title: res.rows[0].title,
    description: res.rows[0].description,
    date: res.rows[0].date,
    partyOwner: partyOwner,
    entertainmentService: servicesTitles.entertainment_service,
    musicService: servicesTitles.music_service,
    foodService: servicesTitles.food_service,
    generalService: servicesTitles.general_service,
    locationService: servicesTitles.location_service,
    photos: res.rows[0].photos,
  };
}
