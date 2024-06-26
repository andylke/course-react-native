import * as SQLite from "expo-sqlite";
import { Place } from "../model/place";

const db = SQLite.openDatabaseSync("places.db");

export function init() {
  return db.withTransactionSync(() => {
    db.execSync(
      `CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
    );`
    );
  });
}

export function insertPlace(place) {
  return db.withTransactionSync(() => {
    const result = db.runSync(
      `INSERT INTO places (title, imageUri, address, lat, lng) VALUES(?, ?, ?, ?, ?)`,
      place.title,
      place.imageUri,
      place.address,
      place.location.lat,
      place.location.lng
    );
    console.log("insert result = " + JSON.stringify(result));
  });
}

export async function getAllPlaces() {
  const allPlaces = [];
  for await (const row of db.getEachAsync(`SELECT * FROM places`)) {
    const place = new Place(
      row.title,
      row.imageUri,
      {
        address: row.address,
        lat: row.lat,
        lng: row.lng,
      },
      row.id
    );
    allPlaces.push(place);
  }
  console.log("fetched all places = " + JSON.stringify(allPlaces));
  return allPlaces;
}

export function getPlace(id) {
  const row = db.getFirstSync(`SELECT * FROM places WHERE id=?`, id);
  const place = new Place(
    row.title,
    row.imageUri,
    {
      address: row.address,
      lat: row.lat,
      lng: row.lng,
    },
    row.id
  );
  console.log("fetched place = " + JSON.stringify(place));
  return place;
}
