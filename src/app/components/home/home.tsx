"use client";

import { Button } from "@nextui-org/react";
import HomeNavbar from "../navbar/home-navbar";
import { FaHourglassStart } from "react-icons/fa";
import NewOrganization from "../organization/addnew";
import ContactForm from "./contact-form";

const HomePage = () => {
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

  return (
    <div className="relative min-h-screen flex flex-col p-2">
      <HomeNavbar />
      <div className="flex mt-2">
        <div className="flex flex-col mt-12 text-center w-1/2">
          <h1 className="mb-8 text-4xl font-extrabold leading-tight lg:text-6xl text-dark-grey-900 px-6">
            Next Generation Project Monitering
          </h1>
          <h2 className="m4-6 text-3xl font-bold italic text-blue-700">
            ProTrack
          </h2>
          <div className="mb-6 text-base font-normal text-grey-900 text-center justify-center px-12 mt-6">
            "The Project Monitoring Web App is a powerful tool designed to
            streamline and enhance the process of overseeing and managing
            projects. It provides real-time visibility into project progress,
            performance, and key metrics, enabling project managers and
            stakeholders to make informed decisions and take timely actions. The
            web app offers a user-friendly interface and a range of features to
            facilitate efficient project monitoring."
          </div>
          <div className="flex flex-col items-center gap-4">
            <NewOrganization />
          </div>
          <div>{/* <ContactForm /> */}</div>
        </div>
        <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-1/2 h-screen">
          <img
            src="https://source.unsplash.com/random"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        {/* <img
            className="rounded-md min-h-screen"
            src="https://img.freepik.com/free-vector/time-management-concept-with-planning-time-symbols-isometric_1284-55714.jpg"
            alt="header image"
          /> */}
      </div>
    </div>
  );
};

export default HomePage;
