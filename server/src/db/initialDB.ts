import path from "path";
require("dotenv").config({ path: path.resolve(__dirname + "/../../.env") });
import { Pool } from "pg";
import { addUser } from "./users";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect();
initDB();

async function initDB() {
  await dropAllTables();
  await addUsersToDb();
  await addUser({
    username: "admin",
    password: "admin",
    email: "admin",
    status: undefined,
    confirmationCode: undefined,
    isAdmin: true,
  });
  console.log("done!");
}

async function dropAllTables() {
  await pool.query("DROP TABLE IF EXISTS users");
}

async function addUsersToDb() {
  await pool.query(`CREATE TYPE STATUS AS ENUM ('pending', 'active')`);
  await pool.query(
    `CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        status STATUS DEFAULT 'pending',   
        confirmation_code TEXT UNIQUE,
        is_admin BOOLEAN DEFAULT false
		)`
  );
}
