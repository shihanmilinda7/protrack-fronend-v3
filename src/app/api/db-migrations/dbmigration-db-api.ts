import { createDbPath, masterdb } from "@/db";
const Database = require("better-sqlite3");

export const getPendingDbmigrations = async () => {
  let rows;
  const transaction = masterdb.transaction(() => {
    try {
      const query1 = `SELECT * FROM databasemigrations WHERE status = 'pending';`;
      rows = masterdb.prepare(query1).all();
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return rows;
};

export const getAllDbmigrations = async (postsPerPage, offset) => {
  let rows;
  const transaction = masterdb.transaction(() => {
    try {
      const query1 = `SELECT * FROM databasemigrations ORDER BY migrationid DESC limit ${postsPerPage} offset ${offset};`;
      rows = masterdb.prepare(query1).all();
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return rows;
};

export const getDbmigrationfCount = async () => {
  let rows;
  const transaction = masterdb.transaction(() => {
    try {
      const query = `SELECT COUNT(*) as count FROM databasemigrations;`;

      rows = masterdb.prepare(query).get();
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return rows.count;
};

export const runDbmigrations = async (dbList, queryList) => {
  try {
    for (let index = 0; index < dbList.length; index++) {
      const company = dbList[index];
      const tmpDb = new Database(`./${company.dbname}.db`);
      for (let index = 0; index < queryList.length; index++) {
        const tmpQuery = queryList[index];
        // console.log("tmpDb", tmpQuery.querystring);
        tmpDb.prepare(tmpQuery.querystring).run();
        const query2 = `UPDATE databasemigrations SET status = 'done'
        WHERE querystring = ?;`;
        masterdb.prepare(query2).run(tmpQuery.querystring);
      }
    }
  } catch (error) {
    console.error("Error adding column:", error);
  }
};

export const addnewQuery = async (querystring) => {
  let rows;
  const transaction = masterdb.transaction(() => {
    try {
      const currentTimestamp = new Date();
      const query1 = `INSERT INTO databasemigrations (querystring,
        type,
        status) VALUES (?,?,?);`;

      masterdb.prepare(query1).run(querystring, "", "pending");
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return rows;
};
