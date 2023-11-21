"use client";

import { useEffect, useState } from "react";
import { UserListTable } from "../chatbox/userlist-table";
import { useSession } from "next-auth/react";
import { DashboardUserListTable } from "./dashboard-userlist-table";

export const DashboardUserLoginTable = ({ toggleWs }: { toggleWs: any }) => {
  //get pathname
  let pathname: string = "";

  try {
    pathname = window.location.href;
    // console.log("pathname1", window.location.href);
  } catch (error) {}

  if (pathname) {
    const r: number = pathname.indexOf("/", 9);
    if (r !== -1) {
      pathname = pathname.substring(0, r);
    }
    // console.log("pathname", pathname);
  }

  const [userList, setUserList] = useState([]);
  // const [testSum, setTestSum] = useState<any>(0);
  // const [activeUserList, setActiveuserList] = useState([]);

  const [displayUserList, setDisplayUserList] = useState([]);

  useEffect(() => {
    // Set an interval to run the function every 30 minutes (30 minutes * 60 seconds * 1000 milliseconds).
    const intervalId = setInterval(createUserList, 30 * 60 * 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    // console.log("toggleWs", toggleWs);
    createUserList();
    // getAssignedProjectDetails();
  }, [toggleWs]);

  const createUserList = async () => {
    const allUsers = await getUserList();
    // console.log("allUsers", allUsers);
    const { filteredLoginDetails, userTotalLoginHours } =
      await getUserLoginDetails();

    const tmpUserList = allUsers?.map((u: any) => {
      const result: any = filteredLoginDetails?.find(
        (u1: any) => u.userid === u1.userid
      );
      const result1: any = userTotalLoginHours?.find(
        (u1: any) => u.userid == u1.userid
      );
      return {
        userid: u.userid,
        username: u.username,
        staffname: u.staffname,
        status: result ? "Active" : "Inactive",
        totalhours: result1 ? result1.totalhours : "0h-0min",
      };
    });
    setDisplayUserList(tmpUserList);
  };

  const getUserList = async () => {
    const reponse = await fetch("api/staff/get-userdata", {
      cache: "no-store",
    });
    const res = await reponse.json();
    return res.users;
  };

  const getUserLoginDetails = async () => {
    const reponse = await fetch(pathname + "/api/auth/login");
    const res = await reponse.json();
    // setUserList(res.userLoginDetails);
    /////////////////////
    const userTotalLoginHours: any = res.modUserLoginDetails;
    // setTestSum(userTotalLoginHours);
    //////////////////////
    const filteredLoginDetails = res.userLoginDetails?.filter(
      (detail) => detail.logouttime == ""
    );
    // setActiveuserList(filteredLoginDetails);
    return { filteredLoginDetails, userTotalLoginHours };
  };

  return (
    <div className="w-full">
      {/* {JSON.stringify(displayUserList)} */}
      <DashboardUserListTable userListIn={displayUserList} />
      {/* <UserListTable userListIn={displayUserList} /> */}
    </div>
  );
};
