// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.route('/api')
  .get(async (req, res) => {
    console.log('GET request detected');
  })
  .post(async (req, res) => {
    console.log('POST request detected');
    console.log('Form data in res.body', req.body);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

const dbSettings = {
  filename: '/tmp/database.db',
  driver: sqlite3.Database
};


async function dataFetch() {
  const url = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";
  const response = await fetch(url);

  return response.json();
}

async function insertIntoDB(data) {
  try {
    const restaurant_name = data.name;
    const category = data.category;

    await db.exec(`INSERT INTO restaurants (restaurant_name, category) VALUES ("${restaurant_name}", "${category}")`);
    console.log(`${restaurant_name} and ${category} inserted`);
  } catch (e) {
    console.log('Error on insertion');
    console.log(e);
  }
}

async function databaseInitialize(dbSettings) {
  try {
    const db = await open(dbSettings);
		await db.exec(`CREATE TABLE IF NOT EXISTS restaurants (id INTEGER PRIMARY KEY AUTOINCREMENT, restaurant_name TEXT, category TEXT)`);
		const test = await db.get("SELECT * FROM restaurants");
		console.log(test);
  } catch (e) {
    console.log("Error loading Database");
  }
}

databaseInitialize(dbSettings);
