import { db } from "@/db";
import { format } from "date-fns";

export const login = async (username) => {
  let rows;
  const transaction = db.transaction(() => {
    try {
      const query = `SELECT * FROM users WHERE username = ?;`;
      rows = db.prepare(query).all(username);
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return rows;
};

export const companyLogin = async (email, dbname) => {
  let rows;
  const transaction = dbname.transaction(() => {
    try {
      const query = `SELECT * FROM users WHERE email = ?;`;
      rows = dbname.prepare(query).all(email);
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return rows;
};

export const newLogin = async (userid) => {
  // console.log("userid", userid);
  let rows;
  const transaction = db.transaction(() => {
    try {
      // const currentTimestamp = new Date();
      const currentTimestamp = new Date();
      const formattedDatecurrentTimestamp = format(
        currentTimestamp,
        "yyyy-MM-dd'T'HH:mm:ss"
      );

      const query1 = `INSERT INTO logindetails (userid,
        logintime,
        logouttime) VALUES (?,?,?);`;

      const login = db
        .prepare(query1)
        .run(userid, formattedDatecurrentTimestamp, "");
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return rows;
};

export const newLogout = async (userid) => {
  // console.log("useriddddddd",userid,)
  let rows;
  const transaction = db.transaction(() => {
    try {
      const currentTimestamp = new Date();
      const formattedDatecurrentTimestamp = format(
        currentTimestamp,
        "yyyy-MM-dd'T'HH:mm:ss"
      );
      const query = `UPDATE logindetails
      SET logouttime = '${formattedDatecurrentTimestamp}'
      WHERE userid = ${userid}
      AND logindetailid = (
          SELECT MAX(logindetailid)
          FROM logindetails
          WHERE userid = ${userid}
      );`;
      // console.log("userid", userid, currentTimestamp.toISOString());
      db.prepare(query).run();
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return rows;
};

export const getUserLoginDetails = async () => {
  let rows;
  const transaction = db.transaction(() => {
    const currentTimestamp = new Date();
    const year = currentTimestamp.getFullYear();
    const month = (currentTimestamp.getMonth() + 1).toString().padStart(2, "0");
    const day = currentTimestamp.getDate().toString().padStart(2, "0");
    const formattedItemDate = `${year}-${month}-${day}`;
    try {
      const query = `SELECT * FROM logindetails WHERE logintime LIKE ?;`;

      rows = db.prepare(query).all(`${formattedItemDate}%`);
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return rows;
};

export const getIsAnyEmptyLogout = async (userid) => {
  let inactiveSessionDetails;
  let lastloginDetails;
  let rows;
  const transaction = db.transaction(() => {
    try {
      const query1 = `SELECT *
      FROM logindetails
      WHERE logouttime IS NOT NULL AND logouttime = '' AND userid = ?
      AND logindetailid <> (SELECT MAX(logindetailid) FROM logindetails WHERE userid = ?);`;
      inactiveSessionDetails = db.prepare(query1).all(userid, userid);
      // const query = `SELECT *
      // FROM logindetails
      // WHERE (logouttime IS NULL OR logouttime = '') AND userid = ?;`;
      const query2 = `SELECT *
      FROM logindetails
      WHERE logouttime IS NOT NULL AND logouttime = '' AND userid = ?
      AND logindetailid = (SELECT MAX(logindetailid) FROM logindetails WHERE userid = ?);`;
      lastloginDetails = db.prepare(query2).all(userid, userid);
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return { inactiveSessionDetails, lastloginDetails };
};

export const newLateLogout = async (userid, datetime, logindetailidIn) => {
  let rows;
  const transaction = db.transaction(() => {
    try {
      const currentTimestamp = new Date(datetime);
      const formattedDatecurrentTimestamp = format(
        currentTimestamp,
        "yyyy-MM-dd'T'HH:mm:ss"
      );
      const query = `UPDATE logindetails
      SET logouttime = '${formattedDatecurrentTimestamp}'
      WHERE userid = ${userid}
      AND logindetailid = ${logindetailidIn};`;
      // console.log("userid", userid, currentTimestamp.toISOString());
      db.prepare(query).run();
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return rows;
};
