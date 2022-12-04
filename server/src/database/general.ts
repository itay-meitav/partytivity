import envConfig from "../api/config/environment.config";
import { Pool } from "pg";

export const pool = new Pool({
  // connectionString:
  //   process.env.NODE_ENV != "production"
  //     ? envConfig.db.DEV_DATABASE_URL
  //     : envConfig.db.PROD_DATABASE_URL,
  connectionString: envConfig.db.PROD_DATABASE_URL,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
  keepAlive: true,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function connectDB() {
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
    const res = await pool.query(query.text, query.values || []);
    return res;
  } catch (e) {
    console.error(e.stack);
    return e.stack;
  }
}
