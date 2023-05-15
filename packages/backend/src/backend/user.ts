import { faker } from "@faker-js/faker";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

import GraphweaverSimpleResolver from "@kyedoesdev/graphweaver-simple-resolver";

export const user = new GraphweaverSimpleResolver({
  name: "user",
  fields: [
    { name: "name", type: "string" },
    { name: "email", type: "string" },
  ],
  init: async () => {
    const db = await open({
      filename: "/tmp/users.db",
      driver: sqlite3.Database,
    });

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

    return { db };
  },
  read: async ({ db }, filter, _pagination) => {
    // @todo add some basic filtering helpers to package
    if (filter?.id) {
      const user = await db.get("SELECT * from users WHERE id = :id", {
        ":id": filter.id,
      });
      console.log("user is", user);
      return [user];
    } else {
      const users = await db.all("SELECT * from users");
      return users;
    }
  },
  write: async ({ db }, data, id) => {
    if (!id) {
      // Create a new entry
      const newItem = { ...createFakeUser(), ...data };
      await db.run("INSERT INTO users VALUES (:id,:name;email)", {
        ":id": newItem.id,
        ":name": newItem.name,
        ":email": newItem.email,
      });
      return newItem;
    } else {
      // Update existing entry
      const existingItem = await db.get("SELECT * from users WHERE id = :id", { ':id': id } );
      if(!existingItem) throw new Error("Could not find item with ID");
      const newItem = { ...existingItem, ...data };
      await db.run(
        "UPDATE users set id = :id, name = :name, email = :email WHERE id = :existingId",
        { ":existingId": id, ':id': newItem.id, ':name': newItem.name, ':email': newItem.email }
      );
      return newItem;
    }
  },
});
