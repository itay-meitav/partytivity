import { query as execQuery } from "../general";

export async function getUserParties(
  usernameId: string,
  limit: number,
  offset: number,
  orderBy?: any
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

export async function countUserParties(usernameId: string) {
  const query = {
    text: `SELECT COUNT(*) FROM parties WHERE owner_id = $1`,
    values: [usernameId],
  };
  const res = await execQuery(query);
  return res.rows[0].count;
}

export async function checkIfPartyExists(partyTitle: string, userID: number) {
  const query = {
    text: `SELECT * FROM parties WHERE title = $1 AND owner_id = $2`,
    values: [partyTitle, userID],
  };
  const res = await execQuery(query);
  return res.rows[0];
}
