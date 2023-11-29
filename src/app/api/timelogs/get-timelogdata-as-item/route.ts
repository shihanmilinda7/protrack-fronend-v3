import { NextResponse } from "next/server";
import { getTimelogDataAsItemid } from "../timelog-db-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let res;

  const itemid: any = searchParams.get("itemid");

  try {
    const timelogData = await getTimelogDataAsItemid(itemid);
    res = { message: "SUCCESS", timelogData };
  } catch (error) {
    console.error("Error getting timelog data source:", error);
    res = { message: "FAIL" };
  }

  return NextResponse.json(res);
}
