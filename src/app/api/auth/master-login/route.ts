import { NextResponse } from "next/server";
import { getUserLoginDetails, newLogin, newLogout } from "../login-db-api";
import { masterLogin } from "../master-login-db-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email: any = searchParams.get("email");

  let res;
  let masterUser = [];
  try {
    masterUser = await masterLogin(email);

    res = { message: "SUCCESS", masterUser };
  } catch (error) {
    console.error("Error adding new staff:", error);
    res = { message: "FAIL", masterUser };
  }

  return NextResponse.json(res);
}
