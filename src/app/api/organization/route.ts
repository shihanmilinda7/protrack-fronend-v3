import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getPendingOrganization, newOrganization } from "./organization-db-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let res;

  try {
    const pendingOrganizations = await getPendingOrganization();
    res = { message: "SUCCESS", pendingOrganizations };
  } catch (error) {
    res = { message: "FAIL" };
  }

  return NextResponse.json(res);
}

export async function POST(request: Request) {
  const {
    name,
    organizationname,
    country,
    address,
    companyemail,
    contactno,
    adminemail,
  } = await request.json();
  let message: string = "SUCCESS";
  try {
    await newOrganization(
      name,
      organizationname,
      country,
      address,
      companyemail,
      contactno,
      adminemail
    );
  } catch (error) {
    console.error("Error adding new Organization:", error);
    message = "FAIL";
  }
  return NextResponse.json(message);
}
