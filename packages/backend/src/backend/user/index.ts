import { faker } from "@faker-js/faker";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

import GraphweaverSimpleResolver from "@kyedoesdev/graphweaver-simple-resolver";
import {
  connectToDatabase,
  initialiseEmptyDatabase,
  getOneUserById,
  getAllUsers,
  createUser,
  updateUser,
} from "./util";

export const user = new GraphweaverSimpleResolver({
  name: "user",
  fields: [
    { name: "name", type: "string" },
    { name: "email", type: "string" },
  ],
  init: async () => {
    const db = await connectToDatabase();
    await initialiseEmptyDatabase(db);
    return { db };
  },
  read: ({ db }, filter, pagination) => {
    // @todo add some basic filtering helpers to package
    if (filter?.id) {
      return getOneUserById(db, filter.id);
    } else {
      return getAllUsers(db);
    }
  },
  create: ({ db }, data) => {
    return createUser(db, data);
  },
  update: ({ db }, id, data) => {
    return updateUser(db, id, data);
  },
  // remove: () => {}
});
