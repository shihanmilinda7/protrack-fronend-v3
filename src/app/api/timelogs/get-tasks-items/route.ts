import { NextResponse } from "next/server";
import { getProjectTaskItems } from "../../project/project-db-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let res;

  const taskid: any = searchParams.get("taskid");

  const taskItems: any = await getProjectTaskItems(taskid);

  res = { message: "SUCCESS", taskItems };

  return NextResponse.json(res);
}
