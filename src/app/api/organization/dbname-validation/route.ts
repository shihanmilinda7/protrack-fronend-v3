import { NextResponse } from "next/server";
import { dbnameValidation } from "../organization-db-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let res;
  const dbname: string = searchParams.get("dbname") ?? "";

  try {
    const companyDbname = await dbnameValidation(dbname);

    if (companyDbname.length > 0) {
      res = { message: "EXISTS" };
    } else {
      res = { message: "NOTEXISTS" };
    }
  } catch (error) {
    res = { message: "FAIL" };
  }

  return NextResponse.json(res);
}
