import { db } from "@/db";

export const newProjectHeader = async (
  projectname,
  projectdescription,
  startdate,
  enddate,
  projectstatus
) => {
  let rows;
  const transaction = db.transaction(() => {
    try {
      const query1 = `INSERT INTO projects (projectname,
        projectdescription,
        startdate,
        enddate,
        projectstatus) VALUES (?,?,?,?,?);`;

      const project = db
        .prepare(query1)
        .run(
          projectname,
          projectdescription,
          startdate,
          enddate,
          projectstatus
        );
      // console.log("staff", project.lastInsertRowid);
      rows = project.lastInsertRowid;
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return rows;
};

export const updateProjectHeader = async (
  projectid,
  projectname,
  projectdescription,
  startdate,
  enddate,
  projectstatus
) => {
  let rows;
  const transaction = db.transaction(() => {
    try {
      const query1 = `UPDATE projects SET projectname = ?,
      projectdescription = ?,
      startdate = ?,
      enddate = ?,
      projectstatus = ? WHERE projectid = ?;`;

      db.prepare(query1).run(
        projectname,
        projectdescription,
        startdate,
        enddate,
        projectstatus,
        projectid
      );
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return rows;
};

export const deleteProject = async (projectid) => {
  let rows;
  const transaction = db.transaction(() => {
    try {
      const query1 = `DELETE FROM projects WHERE projectid = ?;`;

      db.prepare(query1).run(projectid);

      const query2 = `DELETE FROM projecttasks WHERE projectid = ?;`;

      db.prepare(query2).run(projectid);
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return rows;
};
