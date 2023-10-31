import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { type NextAuthOptions } from "next-auth";
import { compare } from "bcryptjs";
import { companyLogin, login, newLogin } from "../login-db-api";
import bcrypt from "bcryptjs";
import { newUser } from "../../organization/organization-db-api";
import { masterLogin } from "../master-login-db-api";
import { createDbPath, updateDBConnection } from "@/db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      // async authorize(credentials) {
      async authorize(
        credentials: Record<string, string> | undefined
      ): Promise<any | null> {
        try {
          if (
            !credentials?.email ||
            !credentials?.password ||
            !credentials?.dbname
          ) {
            return null;
          }
          // console.log("user");
          process.env.DB_CONNECTION_STRING = credentials?.dbname;
          updateDBConnection(credentials?.dbname);
          // console.log("credentials?.email", credentials?.email);
          // console.log("credentials?.password", credentials?.password);
          // console.log("credentials?.dbname", credentials?.dbname);
          const tmpdb = await createDbPath(credentials?.dbname);
          const user = await companyLogin(credentials?.email, tmpdb);
          // console.log("user", user);
          await newLogin(user[0].userid);
          // if (user.length == 0) {
          //   return null;
          // }
          // if (user.length > 0) {
          //   const user1 = user[0];
          //   const tmpPassword = credentials?.password;
          //   const userPassword = user1?.password;
          //   const passwordsMatch = await compare(tmpPassword, userPassword);
          //   if (!passwordsMatch) {
          //     return null;
          //   } else {
          //     await newLogin(user[0].userid);
          //   }
          // }
          // console.log("credentials?.ismultyorg", credentials?.ismultyorg);
          return {
            userid: user[0].userid,
            staffid: user[0].staffid,
            username: user[0].username,
            role: user[0].role,
            country: user[0].country,
            dbname: credentials?.dbname,
            organizationid: credentials?.organizationid,
            organizationname: credentials?.organizationname,
            email: credentials?.email,
            orglist: credentials?.orglist,
            ismultyorg: credentials?.ismultyorg,
          };
        } catch (error) {
          console.log("Error: ", error);
        }
        // console.log("credentials.username",credentials.username,)
      },
    }),
  ],

  callbacks: {
    session: ({ session, token }) => {
      // console.log('Session Callback', { session, token })
      return {
        ...session,
        user: {
          ...session.user,
          userid: token.userid,
          staffid: token.staffid,
          username: token.username,
          role: token.role,
          country: token.country,
          dbname: token.dbname,
          organizationid: token.organizationid,
          organizationname: token.organizationname,
          email: token.email,
          orglist: token.orglist,
          ismultyorg: token.ismultyorg,
          // randomKey: token.randomKey
        },
      };
    },
    jwt: ({ token, user }) => {
      // console.log('JWT Callback', { token, user })
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          userid: u.userid,
          staffid: u.staffid,
          username: u.username,
          role: u.role,
          country: u.country,
          dbname: u.dbname,
          organizationid: u.organizationid,
          organizationname: u.organizationname,
          email: u.email,
          orglist: u.orglist,
          ismultyorg: u.ismultyorg,
        };
      }
      return token;
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
