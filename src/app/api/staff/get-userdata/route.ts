import { NextResponse } from "next/server";
import { getUserData } from "../staff-db-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let res;

  try {
    const users = await getUserData();
    res = { message: "SUCCESS", users };
  } catch (error) {
    console.log("error", error);
    res = { message: "FAIL" };
  }

  return NextResponse.json(res);
}
