import { NextResponse } from "next/server";
import { getActiveOrganization } from "../organization-db-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let res;

  try {
    const activeOrganizations = await getActiveOrganization();
    res = { message: "SUCCESS", activeOrganizations };
  } catch (error) {
    res = { message: "FAIL" };
  }

  return NextResponse.json(res);
}
