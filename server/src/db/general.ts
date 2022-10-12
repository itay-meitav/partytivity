require("dotenv").config({ path: __dirname + "/../../.env" });
import { Pool } from "pg";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
connect();

async function connect() {
  try {
    await pool.connect();
    console.log("Connected to database");
  } catch (error) {
    console.log("Could not connect to database");
    console.log(error);
  }
}

export async function query(query: { text: string; values?: any[] }) {
  try {
    return await pool.query(query.text, query.values || []).then((res) => {
      return res;
    });
  } catch (e) {
    console.error(e);
    return { error: e, rows: [] };
  }
}
