"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Spinner from "./loading";
import Link from "next/link";
import { DashboardUserLoginTable } from "../components/dashboard-userlogindetails/dashboard-userlogindetails";
import { webSocket } from "@/web-socket";
import io from "socket.io-client";
import UpdateEmptyLogoutSessions from "../components/dashboard-userlogindetails/update-empty-logout-sessions";
import { updateDBConnection } from "@/db";
import LineChart from "../components/chart/line-chart";
import ChartDashboard from "../components/chart/dashboard-chart";

type TaskDashBoardObj = {
  taskid?: number;
  location?: string;
  clientname?: string;
  categoryid?: number;
  categoryname?: string;
};

// const webSocket = io("http://localhost:5000");
export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  // console.log("session", session);
  const tmpUser = session?.user;
  const userRole = session?.user?.role;
  const userid = session?.user?.userid;
  // console.log("session?.user?.orglist",session?.user?.orglist,)
  const [logginCount, setLogginCount] = useState(1);

  const [staffid, setStaffid] = useState<any>(tmpUser?.staffid);
  const [staffCount, setStaffCount] = useState("");
  const [projectCount, setProjectCount] = useState("");
  const [projectObject, setProjectbject] = useState<any[]>([]);

  const [unlogutSession, setUnlogutSession] = useState([]);
  const [lastLoginDetails, setLastLoginDetails] = useState([]);
  const [isLogoutTimeOpen, setIsLogoutTimeOpen] = useState(false);
  const [saveToggle, setSaveToggle] = useState(false);

  useEffect(() => {
    if (userid) {
      // updateDBConnection("template");
      getIfAnyUnlogoutSession();
    }
  }, [userid, saveToggle]);

  useEffect(() => {
    getStaffDetails();
    getProjectDetails();
  }, [staffid]);

  useEffect(() => {
    webSocket.emit("join_room", "adminroom");
    webSocket.emit("logging", { message: "logged", room: "adminroom" });
  }, []);

  useEffect(() => {
    webSocket.on("receive_logging", function (data) {
      setLogginCount((prv) => prv + 1);
    });

    webSocket.on("receive_logout", (data) => {
      setLogginCount((prv) => prv + 1);
    });

    return () => {
      webSocket.off("receive_logging");
      webSocket.off("receive_logout");
    };
  }, []);

  const toggleSave = () => {
    setSaveToggle((prv: boolean) => !prv);
  };

  const getStaffDetails = async () => {
    const fetchData = async () => {
      const response = await fetch("api/dashboard/get-staff-details");
      const res = await response.json();
      setStaffCount(res.totalStaffCount);
    };
    fetchData().catch(console.error);
  };

  const getProjectDetails = async () => {
    const fetchData = async () => {
      const response = await fetch("api/dashboard/get-project-details");
      const res = await response.json();
      setProjectCount(res.totalProjectCount);
    };
    fetchData().catch(console.error);
  };

  const getIfAnyUnlogoutSession = async () => {
    const fetchData = async () => {
      const response = await fetch(
        "api/auth/get-empty-logout?userid=" + userid
      );
      const res = await response.json();
      // console.log("res", res);
      setUnlogutSession(res.inactiveSessionDetails);
      setLastLoginDetails(res.lastloginDetails);
      if (res.inactiveSessionDetails.length > 0) {
        openLogoutTimePopup();
      }
    };
    fetchData().catch(console.error);
  };

  const openLogoutTimePopup = () => {
    setIsLogoutTimeOpen(true);
  };

  const getAssignedProjectDetails = async () => {
    const fetchData = async () => {
      const reponse = await fetch(
        "api/time-allocation/get-assign-projects?page-number=1&staffid=" +
          staffid
      );
      const res = await reponse.json();
      setProjectbject(res.project);
    };
    if (staffid) {
      fetchData().catch(console.error);
    }
  };

  if (status === "loading") {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (!session) {
    router.push("/"); // Redirect to login page if not authenticatedt
    return null;
  }
  return (
    <div className="bg-slate-200 flex flex-col w-full">
      <Navbar />
      <UpdateEmptyLogoutSessions
        isOpenPopup={isLogoutTimeOpen}
        logintimeIn={unlogutSession[0]?.logintime}
        logindetailidIn={unlogutSession[0]?.logindetailid}
        lastLoginTime={lastLoginDetails[0]?.logintime}
        toggleSave={toggleSave}
      />
      <div className="flex w-full flex-wrap sm:flex-nowrap gap-1">
        <div className="flex flex-col w-full sm:max-w-[80vw]">
          <h1 className="text-2xl m-4 text-blue-800 font-semibold">
            Elevate productivity today.
          </h1>
          <div className="flex gap-1">
            <ChartDashboard />
            {/* <div className="">
              <LineChart />
            </div>
            <div className="">
              <LineChart />
            </div> */}
          </div>
        </div>
        <div className="flex flex-col w-[40vw] flex-wrap hidden">
          <div className="flex flex-wrap pt-4 z-48">
            <div
              className={
                userRole == "Admin" ||
                userRole == "Manager" ||
                userRole == "systemadmin1"
                  ? "mt-4 w-full lg:w-6/12 xl:w-6/12 px-5 mb-4 max-h-48 overflow-auto z-0"
                  : "hidden"
              }
            >
              <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                  <div className="flex flex-wrap">
                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h4 className="font-semibold text-blue-900 text-lg text-blueGray-700">
                        Staff Details
                      </h4>
                      <h4 className="font-semibold text-blue-700 text-base text-blueGray-700">
                        Staff Count - {staffCount}
                      </h4>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-green-500">
                        <i className="fas fa-chart-bar"></i>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-blueGray-400 mt-4"></p>
                  <Link
                    href="/staff"
                    className="ml-auto flex justify-center w-1/4 bg-gradient-to-r from-blue-500 to-blue-600 hover:bg-gradient-to-l hover:from-blue-500 hover:to-blue-600 text-gray-100 p-2  rounded-lg tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>

            <div
              className={
                userRole == "Admin" ||
                userRole == "Manager" ||
                userRole == "systemadmin1"
                  ? "mt-4 w-full lg:w-6/12 xl:w-6/12 px-5 mb-4 max-h-48 overflow-auto  z-48 hidden"
                  : "hidden"
              }
            >
              <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg ">
                <div className="flex-auto p-4">
                  <div className="flex flex-wrap">
                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h4 className="font-semibold text-blue-900 text-lg text-blueGray-700">
                        Project Details
                      </h4>
                      <h4 className="font-semibold text-blue-700 text-base text-blueGray-700">
                        Project Count - {projectCount}
                      </h4>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-red-500">
                        <i className="fas fa-chart-bar"></i>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-blueGray-400 mt-4"></p>
                  <Link
                    href="/project"
                    className="ml-auto flex justify-center w-1/4 bg-gradient-to-r from-blue-500 to-blue-600 hover:bg-gradient-to-l hover:from-blue-500 hover:to-blue-600 text-gray-100 p-2  rounded-lg tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>

            <div
              className={
                userRole == "User" ||
                userRole == "Manager" ||
                userRole == "systemadmin"
                  ? "mt-4 w-full lg:w-6/12 xl:w-6/12 px-5 mb-4 max-h-48 overflow-auto  z-48 hidden"
                  : "hidden"
              }
            >
              <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                  <div className="flex flex-wrap">
                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h4 className="font-semibold text-blue-900 text-lg text-blueGray-700">
                        Project Details
                      </h4>
                      <div className="flex flex-col">
                        {projectObject?.map((p, index) => (
                          <div
                            key={p.projectid}
                            className="cursor-pointer border-blue-700 mt-1"
                          >
                            {/* <h5 className="font-semibold text-base text-blueGray-700">
                          {index + 1}. {p.projectname}
                        </h5> */}
                            <Link
                              href={
                                "/project/new-project?projectid=" + p.projectid
                              }
                              className="font-semibold text-base text-blueGray-700  hover:font-bold"
                            >
                              {index + 1}. {p.projectname}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500">
                        <i className="fas fa-chart-bar"></i>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-blueGray-400 mt-4"></p>
                  <Link
                    href="/time-allocation"
                    className="ml-auto flex justify-center w-1/4 bg-gradient-to-r from-blue-500 to-blue-600 hover:bg-gradient-to-l hover:from-blue-500 hover:to-blue-600 text-gray-100 p-2  rounded-lg tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={userRole == "User" ? "hidden" : "flex sm:w-[20vw] w-full sm:mr-1"}>
          {/* <button onClick={toggleWs1}>click </button> */}
          <DashboardUserLoginTable toggleWs={logginCount} />
        </div>
      </div>
    </div>
  );
}
