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
      details.ownerId,
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
  usernameId: number,
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

export async function getServiceIDByName(name: string, serviceType: string) {
  const query = {
    text: `SELECT id FROM ${serviceType} WHERE title = $1`,
    values: [name],
  };
  const res = await execQuery(query);
  return { [serviceType]: res.rows[0].id };
}

export async function getServicesByType(serviceType: string) {
  const query = {
    text: `SELECT title FROM ${serviceType}`,
  };
  const res = await execQuery(query);
  return res.rows;
}

export async function getPartyDetailsByID(partyID: string | JwtPayload) {
  const query = {
    text: `SELECT * FROM parties WHERE id = $1`,
    values: [partyID],
  };
  const res = await execQuery(query);
  return res.rows[0];
}
