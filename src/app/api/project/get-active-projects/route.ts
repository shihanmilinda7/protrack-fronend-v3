import { NextResponse } from "next/server";
import {
  getActiveProjects,
  getProjectTaskItems,
  getProjectTasks,
} from "../project-db-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let res;

  try {
    const activeProjects = await getActiveProjects();

    for (let i = 0; i < activeProjects.length; i++) {
      const element = activeProjects[i];
      const projectTasks = await getProjectTasks(element.projectid);
      element["projecttasks"] = projectTasks;

      for (let j = 0; j < projectTasks.length; j++) {
        const element1 = projectTasks[j];
        const taskItems = await getProjectTaskItems(element1.taskid);
        element1["taskitems"] = taskItems;
      }
    }
    res = { message: "SUCCESS", activeProjects };
  } catch (error) {
    console.log("error", error);
    res = { message: "FAIL" };
  }

  return NextResponse.json(res);
}
