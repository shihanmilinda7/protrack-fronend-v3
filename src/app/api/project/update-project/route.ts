import { NextResponse } from "next/server";
import {
  deleteProject,
  getProjectHeaderData,
  getProjectTaskItems,
  getProjectTasks,
  updateProject,
} from "../project-db-api";
import { newProjectHeader, updateProjectHeader } from "../project-db-api-v1";
import { getTaskAssignStaff } from "../../project-assign/projectassign-db-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let res;

  const projectid: string = searchParams.get("projectid") ?? "";

  const project = await getProjectHeaderData(projectid);

  if (project.length > 0) {
    const projectTasks = await getProjectTasks(projectid);

    if (projectTasks.length > 0) {
      for (let index = 0; index < projectTasks.length; index++) {
        const element = projectTasks[index];
        const assignMembers: any = await getTaskAssignStaff(element.taskid);
        element["assignmembers"] = assignMembers;

        const taskitems: any = await getProjectTaskItems(element.taskid);
        const updatedData = taskitems.map((item, index) => ({
          ...item,
          rowindex: index + 1,
          rowstatus: "u",
        }));
        element["taskitems"] = updatedData;
      }
      res = { message: "SUCCESS", project, projectTasks };
    } else {
      res = { message: "SUCCESS", project, projectTasks };
    }
  } else {
    res = { message: "FAIL" };
  }
  return NextResponse.json(res);
}

export async function POST(request: Request) {
  const { projectname, projectdescription, startdate, enddate, projectstatus } =
    await request.json();
  let res;

  try {
    const newProjectId = await newProjectHeader(
      projectname,
      projectdescription,
      startdate,
      enddate,
      projectstatus
    );
    res = { message: "SUCCESS", newProjectId };
  } catch (error) {
    console.error("Error adding new project", error);
    res = { message: "FAIL" };
  }
  return NextResponse.json(res);
}

export async function PUT(request: Request) {
  const {
    projectid,
    projectname,
    projectdescription,
    startdate,
    enddate,
    projectstatus,
  } = await request.json();
  let message: string = "SUCCESS";
  try {
    await updateProjectHeader(
      projectid,
      projectname,
      projectdescription,
      startdate,
      enddate,
      projectstatus,
    );
  } catch (error) {
    console.error("Error updating project tasks", error);
    message = "FAIL";
  }
  return NextResponse.json(message);
}

export async function DELETE(request: Request) {
  const { projectid } = await request.json();
  let message: string = "SUCCESS";

  try {
    await deleteProject(projectid);
  } catch (error) {
    console.error("Error deleting staff:", error);
    message = "FAIL";
  }

  return NextResponse.json(message);
}
