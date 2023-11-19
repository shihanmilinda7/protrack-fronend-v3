import { NextResponse } from "next/server";
import {
  addnewQuery,
  getAllDbmigrations,
  getDbmigrationfCount,
} from "../dbmigration-db-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let res;

  const tmpPageNumber: any = searchParams.get("page-number");
  const currentPage: any = parseInt(tmpPageNumber);
  const postsPerPage = 10; // Number of posts per page
  const offset = (currentPage - 1) * postsPerPage;

  try {
    const migrations = await getAllDbmigrations(postsPerPage, offset);
    const migartionCount = await getDbmigrationfCount();
    res = { message: "SUCCESS", migrations, migartionCount };
  } catch (error) {
    console.error("Error getting migration:", error);
    res = { message: "FAIL" };
  }

  return NextResponse.json(res);
}

export async function POST(request: Request) {
  const { querystring } = await request.json();
  let message: string = "SUCCESS";
  try {
    await addnewQuery(querystring);
  } catch (error) {
    console.error("Error add db migration:", error);
    message = "FAIL";
  }
  return NextResponse.json(message);
}
