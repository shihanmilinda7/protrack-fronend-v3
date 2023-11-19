import { createDbPath, masterdb } from "@/db";

export const newOrganization = async (
  name,
  organizationname,
  country,
  address,
  companyemail,
  contactno,
  adminemail
) => {
  let rows;
  const status = "pending";
  const transaction = masterdb.transaction(() => {
    try {
      const query1 = `INSERT INTO organizations (name,
        organizationname,
        country,
        address,
        companyemail,
        contactno,
        adminemail,status) VALUES (?,?,?,?,?,?,?,?);`;

      masterdb
        .prepare(query1)
        .run(
          name,
          organizationname,
          country,
          address,
          companyemail,
          contactno,
          adminemail,
          status
        );
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return rows;
};

export const organizationValidation = async (organizationname, adminemail) => {
  let organizationNameExist;
  let adminuserNameExist;
  const transaction = masterdb.transaction(() => {
    try {
      const query1 = `SELECT * FROM organizations WHERE organizationname = ?;`;
      organizationNameExist = masterdb.prepare(query1).all(organizationname);

      const query2 = `SELECT * FROM organizations WHERE adminemail = ?;`;
      adminuserNameExist = masterdb.prepare(query2).all(adminemail);
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return { organizationNameExist, adminuserNameExist };
};

export const dbnameValidation = async (dbname) => {
  let row;
  const transaction = masterdb.transaction(() => {
    try {
      const query1 = `SELECT * FROM organizations WHERE dbname = ?;`;
      row = masterdb.prepare(query1).all(dbname);
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return row;
};

export const getPendingOrganization = async () => {
  let rows;
  const transaction = masterdb.transaction(() => {
    try {
      const query1 = `SELECT * FROM organizations WHERE status = 'pending';`;
      rows = masterdb.prepare(query1).all();
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return rows;
};

export const updateOrgainzationStatus = async (organizationid, dbname) => {
  let rows;
  const transaction = masterdb.transaction(() => {
    try {
      const query = `UPDATE organizations
      SET 
      status = 'Active',
      dbname = '${dbname}'
      WHERE organizationid = ${organizationid};`;
      masterdb.prepare(query).run();
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return rows;
};

export const newUser = async (hashedPassword, email, organizationid) => {
  let password = 0;
  const transaction = masterdb.transaction(() => {
    try {
      const emailValidation = `SELECT * FROM masterusers WHERE email = ?;`;
      const result = masterdb.prepare(emailValidation).all(email);

      const query1 = `INSERT INTO masterusers (email,password) VALUES (?,?);`;
      const query2 = `INSERT INTO usersorgmapping (masteruserid,organizationid) VALUES (?,?);`;
      if (result.length == 0) {
        const newuser = masterdb.prepare(query1).run(email, hashedPassword);
        const newusermapping = masterdb
          .prepare(query2)
          .run(newuser.lastInsertRowid, organizationid);
      } else {
        password = result[0].password;
        const newusermapping = masterdb
          .prepare(query2)
          .run(result[0].masteruserid, organizationid);
      }
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return password;
};
// export const newUser = async (hashedPassword, email, organizationid) => {
//   let rows;
//   const transaction = masterdb.transaction(() => {
//     try {
//       const query1 = `INSERT INTO masterusers (email,password) VALUES (?,?);`;
//       const newuser = masterdb.prepare(query1).run(email, hashedPassword);

//       const query2 = `INSERT INTO usersorgmapping (masteruserid,organizationid) VALUES (?,?);`;
//       const newusermapping = masterdb
//         .prepare(query2)
//         .run(newuser.lastInsertRowid, organizationid);
//     } catch (error) {
//       console.error("Transaction error:", error);
//     }
//   });
//   transaction();
//   return rows;
// };

export const newCompanyStaff = async (
  staffname,
  contracttype,
  contactno,
  nic,
  hashedPassword,
  username,
  role,
  designation,
  country,
  email,
  dbname
) => {
  let rows;
  const tmpDb = await createDbPath(dbname);
  console.log("dbname", dbname);
  const transaction = tmpDb.transaction(() => {
    try {
      const currentTimestamp = new Date();
      const query1 = `INSERT INTO staff (staffname,
        contracttype,
        contactno,
        nic,
        designation,
        country,createdAt,email) VALUES (?,?,?,?,?,?,?,?);`;

      const staff = tmpDb
        .prepare(query1)
        .run(
          staffname,
          contracttype,
          contactno,
          nic,
          designation,
          country,
          currentTimestamp.toISOString(),
          email
        );

      const query2 = `INSERT INTO users (staffid,
            username,
            password,
            role,
            country,createdAt,email) VALUES (?,?,?,?,?,?,?);`;

      tmpDb
        .prepare(query2)
        .run(
          staff.lastInsertRowid,
          username,
          hashedPassword,
          role,
          country,
          currentTimestamp.toISOString(),
          email
        );
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return rows;
};

export const getActiveOrganization = async () => {
  let rows;
  const transaction = masterdb.transaction(() => {
    try {
      const query1 = `SELECT * FROM organizations WHERE status = 'Active';`;
      rows = masterdb.prepare(query1).all();
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return rows;
};
