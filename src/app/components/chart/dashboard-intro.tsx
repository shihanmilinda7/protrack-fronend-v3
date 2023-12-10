"use client";

import Modal from "react-modal";

import React, { useEffect, useState } from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import { MdGridView } from "react-icons/md";
import Head from "next/head";
import { createIdealLineArray, dateArray, getDateDifference } from "./utils";
import LineChart from "./line-chart";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ListboxWrapperType1 } from "../dashboard-userlogindetails/ListboxWrapperType1";
import { useRouter } from "next/navigation";

const DashboardIntro = () => {
  const router = useRouter();
  return (
    <div className="ml-2">
      <ListboxWrapperType1>
        <div className="flex flex-col gap-1">
          <Card>
            <CardBody>
              <span className="text-base text-blue-800 font-semibold">
                Dashboard Welcome:
              </span>
              <span className="text-sm text-blue-800">
                Upon login, you're greeted by an inviting dashboard. Here, at a
                glance, you'll find a snapshot of your ongoing projects, team
                updates, and pending tasks.
              </span>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <span className="text-base text-blue-800 font-semibold">
                Team Assembly:
              </span>
              <span className="text-sm text-blue-800">
                Start by building your dream team.{" "}
                <span
                  className="font-semibold cursor-pointer hover:text-blue-900 hover:font-bold"
                  onClick={() => router.push("/staff")}
                >
                  Create members
                </span>{" "}
                seamlessly, assign roles, and foster collaboration effortlessly.
                ProTrack ensures a smooth onboarding experience.
              </span>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <span className="text-base text-blue-800 font-semibold">
                Project Creation:
              </span>
              <span className="text-sm text-blue-800">
                Navigate to the{" "}
                <span
                  className="font-semibold cursor-pointer hover:text-blue-900 hover:font-bold"
                  onClick={() => router.push("/project/new-project")}
                >
                  project creation
                </span>{" "}
                feature on your navigation bar. Define project goals, establish
                timelines, and set milestones with ease. ProTrack provides an
                intuitive interface for project structuring.
              </span>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <span className="text-base text-blue-800 font-semibold">
                Task Allocation:
              </span>
              <span className="text-sm text-blue-800">
                Break down projects into tasks and allocate them to team
                members. ProTrack's streamlined task management ensures clarity
                in responsibilities and progress tracking.
              </span>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <span className="text-base text-blue-800 font-semibold">
                Time Tracking:
              </span>
              <span className="text-sm text-blue-800">
                Leverage ProTrack's integrated time management tools to track
                work hours efficiently. Capture every valuable moment.
              </span>
            </CardBody>
          </Card>
        </div>
      </ListboxWrapperType1>
    </div>
  );
};
export default DashboardIntro;
