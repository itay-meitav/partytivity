import path from "path";
require("dotenv").config({ path: path.resolve(__dirname + "/../../.env") });
import { Pool } from "pg";
import { addParty } from "./dashboard/my-parties";
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
  await createAllTables();
  await addUser({
    username: "admin",
    password: "admin",
    email: "admin",
    name: undefined,
    status: undefined,
    role: "admin",
  });
  await addParty({
    title: "my first party",
    description: null,
    ownerId: 1,
    locationID: null,
    musicID: null,
    foodID: null,
    entertainmentID: null,
    generalID: null,
  });
  console.log("done!");
}

async function dropAllTables() {
  await pool.query("DROP TABLE IF EXISTS users CASCADE");
  await pool.query("DROP TABLE IF EXISTS parties CASCADE");
  await pool.query("DROP TABLE IF EXISTS location_service CASCADE");
  await pool.query("DROP TABLE IF EXISTS music_service CASCADE");
  await pool.query("DROP TABLE IF EXISTS food_service CASCADE");
  await pool.query("DROP TABLE IF EXISTS entertainment_service CASCADE");
  await pool.query("DROP TABLE IF EXISTS general_service CASCADE");
  await pool.query("DROP TABLE IF EXISTS collaborators CASCADE"); //WITH (FORCE)
  await pool.query("DROP TABLE IF EXISTS guests CASCADE");
  await pool.query("DROP TYPE IF EXISTS STATUS");
  await pool.query("DROP TYPE IF EXISTS ROLE");
  await pool.query("DROP TYPE IF EXISTS PERMISSIONS");
  await pool.query("DROP TYPE IF EXISTS FOOD_TYPE");
  await pool.query("DROP TYPE IF EXISTS PARTY_STATUS");
}

async function createAllTables() {
  await pool.query(`CREATE TYPE STATUS AS ENUM ('pending', 'active')`);
  await pool.query(`CREATE TYPE ROLE AS ENUM ('admin', 'client', 'provider')`);
  await pool.query(
    `CREATE TYPE PERMISSIONS AS ENUM ('admin', 'readonly', 'write')`
  );
  await pool.query(
    `CREATE TYPE FOOD_TYPE AS ENUM ('fast', 'chef', 'restaurant')`
  );
  await pool.query(`CREATE TYPE PARTY_STATUS AS ENUM ('pending', 'done')`);
  await pool.query(
    `CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        status STATUS DEFAULT 'pending',   
        role ROLE DEFAULT 'client'
		)`
  );
  await pool.query(
    `CREATE TABLE IF NOT EXISTS location_service(
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,  
        city TEXT NOT NULL,
        address TEXT NOT NULL UNIQUE,
        capacity TEXT NOT NULL,
        type TEXT,
        description TEXT,
        provider_id INTEGER,
        FOREIGN KEY(provider_id) REFERENCES users(id) ON DELETE CASCADE
		)`
  );
  await pool.query(
    `CREATE TABLE IF NOT EXISTS music_service(
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,  
        type TEXT NOT NULL,
        description TEXT,
        provider_id INTEGER,
        FOREIGN KEY(provider_id) REFERENCES users(id) ON DELETE CASCADE
		)`
  );
  await pool.query(
    `CREATE TABLE IF NOT EXISTS food_service(
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,  
        type FOOD_TYPE NOT NULL,
        description TEXT,
        provider_id INTEGER,
        FOREIGN KEY(provider_id) REFERENCES users(id) ON DELETE CASCADE
		)`
  );
  await pool.query(
    `CREATE TABLE IF NOT EXISTS entertainment_service(
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,  
        type TEXT NOT NULL,
        description TEXT,
        provider_id INTEGER,
        FOREIGN KEY(provider_id) REFERENCES users(id) ON DELETE CASCADE
		)`
  );
  await pool.query(
    `CREATE TABLE IF NOT EXISTS general_service(
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,  
        type TEXT NOT NULL,
        description TEXT,
        provider_id INTEGER,
        FOREIGN KEY(provider_id) REFERENCES users(id) ON DELETE CASCADE 
		)`
  );
  await pool.query(
    `CREATE TABLE IF NOT EXISTS parties(
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        owner_id INTEGER,
        FOREIGN KEY(owner_id) REFERENCES users(id) ON DELETE CASCADE,
        location_id INTEGER,
        FOREIGN KEY(location_id) REFERENCES location_service(id) ON DELETE CASCADE,
        music_id INTEGER,
        FOREIGN KEY(music_id) REFERENCES music_service(id) ON DELETE CASCADE,
        food_id INTEGER,
        FOREIGN KEY(food_id) REFERENCES food_service(id) ON DELETE CASCADE,
        entertainment_id INTEGER,
        FOREIGN KEY(entertainment_id) REFERENCES entertainment_service(id) ON DELETE CASCADE,
        general_id INTEGER,
        FOREIGN KEY(general_id) REFERENCES general_service(id) ON DELETE CASCADE,
        guests TEXT[],
        status PARTY_STATUS DEFAULT 'pending'
		)`
  );
  await pool.query(
    `CREATE TABLE IF NOT EXISTS collaborators(
        id SERIAL PRIMARY KEY,
        party_id INTEGER,
        FOREIGN KEY(party_id) REFERENCES parties(id) ON DELETE CASCADE,
        permissions PERMISSIONS DEFAULT 'readonly'  
		)`
  );
  await pool.query(
    `CREATE TABLE IF NOT EXISTS guests(
        id SERIAL PRIMARY KEY,
        name TEXT,
        phone_number TEXT,
        is_coming TEXT,
        comment TEXT,
        party_id INTEGER,
        FOREIGN KEY(party_id) REFERENCES parties(id) ON DELETE CASCADE,
		)`
  );
}
