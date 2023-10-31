import { NextResponse } from "next/server";
import { getUserLoginDetails, newLogin, newLogout } from "../login-db-api";
import { getUsersOrgMappingDetails, masterLogin } from "../master-login-db-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const masteruserid: any = searchParams.get("masteruserid");

  let res;
  let mappingDetails = [];
  try {
    mappingDetails = await getUsersOrgMappingDetails(masteruserid);

    res = { message: "SUCCESS", mappingDetails };
  } catch (error) {
    console.error("Error adding new staff:", error);
    res = { message: "FAIL", mappingDetails };
  }

  return NextResponse.json(res);
}
