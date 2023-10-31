import { masterdb, db } from "@/db";
import { format } from "date-fns";

export const masterLogin = async (email) => {
  let rows;
  const transaction = masterdb.transaction(() => {
    try {
      const query = `SELECT * FROM masterusers WHERE email = ?;`;
      rows = masterdb.prepare(query).all(email);
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return rows;
};

export const getUsersOrgMappingDetails = async (masteruserid) => {
  let rows;
  const transaction = masterdb.transaction(() => {
    try {
      const query = `SELECT u.*,o.* FROM usersorgmapping AS u JOIN organizations AS o ON u.organizationid = o.organizationid WHERE u.masteruserid = ?;`;
      rows = masterdb.prepare(query).all(masteruserid);
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return rows;
};
