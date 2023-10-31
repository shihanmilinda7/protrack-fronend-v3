import { NextResponse } from "next/server";
import { organizationValidation } from "../organization-db-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let res;
  const organizationname: string = searchParams.get("organizationname") ?? "";
  const adminemail: string = searchParams.get("adminemail") ?? "";

  const { organizationNameExist, adminuserNameExist } =
    await organizationValidation(organizationname, adminemail);

  if (organizationNameExist.length > 0 && adminuserNameExist.length > 0) {
    res = { message: "BOTH_EXISTS" };
  } else if (
    organizationNameExist.length > 0 &&
    adminuserNameExist.length == 0
  ) {
    res = { message: "EXISTS1" };
  } else if (
    adminuserNameExist.length > 0 &&
    organizationNameExist.length == 0
  ) {
    res = { message: "EXISTS2" };
  } else {
    res = { message: "FAIL" };
  }
  return NextResponse.json(res);
}
