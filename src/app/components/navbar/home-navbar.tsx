"use client";

import { toast } from "react-toastify";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setsaved } from "@/store/saveSlice";
import { CiLogin } from "react-icons/ci";
import io from "socket.io-client";

import {
  setSearchDesignation,
  setSearchProjectName,
  setSearchStaffName,
} from "@/store/searchSlice";
import { useSelector } from "react-redux";
import UpdatePassword from "../common-comp/update-password";
import { webSocket } from "@/web-socket";
import { Button } from "@nextui-org/react";
import NewOrganization from "../organization/addnew";

// const webSocket = io("http://localhost:5000");
// const webSocket = io(process.env.DEVELOPMENT_SOCKET_URL);

const HomeNavbar = () => {
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

  const currentRoute = usePathname();

  const router = useRouter();

  useEffect(() => {
    const button = document.querySelector(
      "#menu-button"
    ) as HTMLButtonElement | null;
    const menu = document.querySelector("#menu") as HTMLElement | null;

    if (button && menu) {
      const clickHandler = () => {
        menu.classList.toggle("hidden");
      };

      button.addEventListener("click", clickHandler);

      // Clean up the event listener when the component unmounts
      return () => {
        button.removeEventListener("click", clickHandler);
      };
    }
  }, []);

  const navButtonHandler = async (btn: string) => {
    switch (btn) {
      case "login":
        router.push("/login");
        break;
      default:
        window.location.href = "/";
    }
  };

  // styles for all links
  const commonStyles = "md:p-4 py-2 block hover:font-bold text-indigo-800";
  const activeStyle =
    // commonStyles + " rounded-t-lg bg-blue-500 text-blue-900";
    commonStyles + " overline";
  const nonActiveStyle = commonStyles;

  //style for dropdown
  const dropCommonStyle = "hover:font-bold py-2 px-4 block whitespace-no-wrap ";
  const dropActiveStyle =
    dropCommonStyle +
    "bg-white text-xs p-4 border border-gray-100 shadow-md font-bold text-xs";
  const dropNonActiveStyle =
    dropCommonStyle + "bg-white text-xs p-4 border border-gray-100 shadow-md";
  return (
    <header>
      <nav
        className="
          flex flex-wrap
          items-center
          justify-between
          w-full
          py-4
          md:py-0
          text-lg text-gray-700
          bg-white p-4 border border-gray-200 shadow-md
        "
      >
        <div className="flex">
          <svg
            width="35px"
            height="35px"
            viewBox="0 0 1024 1024"
            className="icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M511.64164 924.327835c-228.816869 0-414.989937-186.16283-414.989937-414.989937S282.825796 94.347961 511.64164 94.347961c102.396724 0 200.763434 37.621642 276.975315 105.931176 9.47913 8.499272 10.266498 23.077351 1.755963 32.556481-8.488009 9.501656-23.054826 10.266498-32.556481 1.778489-67.723871-60.721519-155.148319-94.156494-246.174797-94.156494-203.396868 0-368.880285 165.482394-368.880285 368.880285S308.243749 878.218184 511.64164 878.218184c199.164126 0 361.089542-155.779033 368.60998-354.639065 0.49556-12.720751 11.032364-22.863359 23.910794-22.177356 12.720751 0.484298 22.649367 11.190043 22.15483 23.910794-8.465484 223.74966-190.609564 399.015278-414.675604 399.015278z"
              fill="#22C67F"
            />
            <path
              d="M960.926616 327.538868l-65.210232-65.209209-350.956149 350.956149-244.56832-244.566273-65.210233 65.209209 309.745789 309.743741 0.032764-0.031741 0.03174 0.031741z"
              fill="#74E8AE"
            />
          </svg>
          <span className="pl-1 mx-auto text-xl font-black leading-none text-gray-900 select-none  flex items-center justify-center">
            CeyInfo<span className="text-indigo-600">ProTrack</span>
          </span>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="menu-button"
          className="h-6 w-6 cursor-pointer md:hidden block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>

        <div
          className="hidden w-full md:flex md:items-center md:w-auto"
          id="menu"
        >
          <ul
            className="
              pt-4
              text-base text-gray-700
              md:flex
              md:justify-between 
              md:pt-0"
          >
            <li className="py-3">
              <NewOrganization />

              {/* <Button
                color="primary"
                onClick={() => navButtonHandler("login")}
                endContent={<CiLogin className="h-6 w-6" />}
              >
                Sign in
              </Button> */}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default HomeNavbar;
