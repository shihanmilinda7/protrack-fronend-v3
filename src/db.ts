import { getSession } from "next-auth/react";

const Database = require("better-sqlite3");

//master database
export const masterdb = new Database("./protrack.db");

export async function createDbPath(dbname) {
  const db1 = new Database(`./${dbname}.db`);
  return db1;
}

// export let db = new Database("./dev.db");
// console.log(
//   "process.env.DB_CONNECTION_STRING",
//   process.env.DB_CONNECTION_STRING
// );
export let db = new Database(`./${process.env.DB_CONNECTION_STRING}.db`);
export function updateDBConnection(newConnectionString) {
  process.env.DB_CONNECTION_STRING = newConnectionString;
  db = new Database(`./${newConnectionString}.db`);
}
