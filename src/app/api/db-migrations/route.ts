import { NextResponse } from "next/server";
import { getPendingDbmigrations, runDbmigrations } from "./dbmigration-db-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let res;

  try {
    const pendingDbmigrations = await getPendingDbmigrations();
    res = { message: "SUCCESS", pendingDbmigrations };
  } catch (error) {
    res = { message: "FAIL" };
  }

  return NextResponse.json(res);
}

export async function POST(request: Request) {
  const { dbList, queryList } = await request.json();
  let message: string = "SUCCESS";
  try {
    await runDbmigrations(dbList, queryList);
  } catch (error) {
    console.error("Error db migration:", error);
    message = "FAIL";
  }
  return NextResponse.json(message);
}
