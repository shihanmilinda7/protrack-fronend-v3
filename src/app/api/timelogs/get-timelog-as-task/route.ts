import { NextResponse } from "next/server";
import { getTimelogDataAsTask } from "../timelog-db-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let res;

  const taskid: any = searchParams.get("taskid");

  try {
    const timelogData = await getTimelogDataAsTask(taskid);
    res = { message: "SUCCESS", timelogData };
  } catch (error) {
    console.error("Error getting timelog data source:", error);
    res = { message: "FAIL" };
  }

  return NextResponse.json(res);
}
