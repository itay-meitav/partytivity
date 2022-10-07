import { query as execQuery } from "../general";

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
}) {
  const query = {
    text: `INSERT INTO parties(title, description, date, owner_id, location_id, music_id, food_id, entertainment_id, general_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    values: [
      details.title,
      details.description,
      details.date,
      details.ownerId,
      details.locationID,
      details.musicID,
      details.foodID,
      details.entertainmentID,
      details.generalID,
    ],
  };
  return execQuery(query).then((data) => data.rows[0]);
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
  return execQuery(query).then((data) => data.rows);
}
