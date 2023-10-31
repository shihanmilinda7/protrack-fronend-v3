import { NextResponse } from "next/server";
import { getUserLoginDetails, newLogin, newLogout } from "../login-db-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let res;

  try {
    const userLoginDetails = await getUserLoginDetails();
    res = { message: "SUCCESS", userLoginDetails };
  } catch (error) {
    console.error("Error adding new staff:", error);
    res = { message: "FAIL" };
  }

  return NextResponse.json(res);
}

export async function POST(request: Request) {
  const { userid } = await request.json();
  let message: string = "SUCCESS";
  try {
    await newLogin(userid);
  } catch (error) {
    console.error("Error adding new login:", error);
    message = "FAIL";
  }
  return NextResponse.json(message);
}

export async function PUT(request: Request) {
  const { userid } = await request.json();
  let message: string = "SUCCESS";
  try {
    await newLogout(userid);
  } catch (error) {
    console.error("Error adding new login:", error);
    message = "FAIL";
  }
  return NextResponse.json(message);
}
