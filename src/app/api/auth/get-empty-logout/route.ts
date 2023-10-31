import { NextResponse } from "next/server";
import { getIsAnyEmptyLogout, newLateLogout } from "../login-db-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userid: any = searchParams.get("userid");
  let res;

  try {
    const { inactiveSessionDetails, lastloginDetails } =
      await getIsAnyEmptyLogout(userid);
    res = { message: "SUCCESS", inactiveSessionDetails, lastloginDetails };
  } catch (error) {
    console.error("Error gettimg empty logout:", error);
    res = { message: "FAIL" };
  }

  return NextResponse.json(res);
}

export async function PUT(request: Request) {
  const { userid, datetime, logindetailidIn } = await request.json();
  let message: string = "SUCCESS";
  try {
    await newLateLogout(userid, datetime, logindetailidIn);
  } catch (error) {
    console.error("Error adding new login:", error);
    message = "FAIL";
  }
  return NextResponse.json(message);
}
