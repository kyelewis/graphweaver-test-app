import { faker } from "@faker-js/faker";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const connectToDatabase = () =>
  open({
    filename: "/tmp/users.db",
    driver: sqlite3.Database,
  });

export const initialiseEmptyDatabase = async (db) => {
  const existingTables = await db.get(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='users'"
  );

  if (!existingTables || existingTables.length < 1) {
    await db.exec(
      "CREATE TABLE IF NOT EXISTS users (id text, name text, email text)"
    );
    for (let i = 0; i <= 20; i++) {
      const newItem = {
        ":id": String(faker.string.uuid()),
        ":name": faker.person.firstName(),
        ":email": faker.internet.email(),
      };
      await db.run("INSERT INTO users VALUES (:id, :name, :email)", newItem);
    }
  }
};

export const getOneUserById = (db, id) =>
  db.get("SELECT * from users WHERE id = :id", {
    ":id": id,
  });

export const getAllUsers = (db) => db.all("SELECT * from users");

export const createUser = async (db, id, data) => {
  const newItem = { ...createFakeUser(), ...data };
  await db.run("INSERT INTO users VALUES (:id,:name;email)", {
    ":id": newItem.id,
    ":name": newItem.name,
    ":email": newItem.email,
  });
  return newItem;
};

export const updateUser = async (db, id, data) => {
  const existingItem = await db.get("SELECT * from users WHERE id = :id", {
    ":id": id,
  });
  if (!existingItem) throw new Error("Could not find item with ID");
  const newItem = { ...existingItem, ...data };
  await db.run(
    "UPDATE users set id = :id, name = :name, email = :email WHERE id = :existingId",
    {
      ":existingId": id,
      ":id": newItem.id,
      ":name": newItem.name,
      ":email": newItem.email,
    }
  );
  return newItem;
};
