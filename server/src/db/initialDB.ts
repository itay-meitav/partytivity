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
    isAdmin: true,
  });
  console.log("done!");
}

async function dropAllTables() {
  await pool.query("DROP TABLE IF EXISTS users");
}

async function addUsersToDb() {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT NOT NULL,
        confirmed BOOLEAN DEFAULT false,   
        is_admin BOOLEAN DEFAULT false
		)`
  );
}
