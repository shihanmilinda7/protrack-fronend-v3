import { NextResponse } from "next/server";
import { emailValidation, usernameValidation } from "../staff-db-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let res;
  const username: string = searchParams.get("username") ?? "";
  const email: string = searchParams.get("email") ?? "";
  const staffid: string = searchParams.get("staffid") ?? "";
  let isEmail;
  let isUsername;

  try {
    isEmail = await emailValidation(email, staffid);
    isUsername = await usernameValidation(username, staffid);
    if (isUsername.length > 0 && isEmail.length > 0) {
      res = { message: "Both Email & Username Already Exists" };
    } else if (isUsername.length > 0 && isEmail.length == 0) {
      res = { message: "Username Already Exists" };
    } else if (isUsername.length == 0 && isEmail.length > 0) {
      res = { message: "Email Already Exists" };
    } else {
      res = { message: "NO_DATA" };
    }
  } catch (error) {
    res = { message: "FAIL" };
  }

  return NextResponse.json(res);
}

// export async function POST(request: Request) {
//   const { staffname, contracttype, contactno, nic, password, username } = await request.json();
//   const hashedPassword = await bcrypt.hash(password, 10);
//   console.log("hashedPassword", hashedPassword,)
//   let message: string = "SUCCESS"
//   try {
//     await prisma.$transaction(async (tx) => {
//       // 1. addnew staff .
//       const staff = await tx.staff.create({
//         data: {
//           staffname,
//           contracttype,
//           contactno,
//           nic,
//         },
//       });

//       // 2. Verify staff enterd
//       if (!staff.staffid) {
//         throw new Error(`Staff not enterd`)
//       }

//       const headerId: number = staff.staffid

//       // 3. addnew user
//       if (staff.staffid) {
//         await tx.users.create({
//           data: {
//             staffid: headerId,
//             username,
//             password: hashedPassword
//           },
//         });
//       }

//       return ""
//     })

//   } catch (error) {
//     console.error('Error adding new staff:', error);
//     message = "FAIL"
//   }
//   return NextResponse.json(message)
// }
