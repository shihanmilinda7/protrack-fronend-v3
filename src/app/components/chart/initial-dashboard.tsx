"use client";

import { useEffect, useState } from "react";
import ChartProject from "./dashboard-project";
import DashboardIntro from "./dashboard-intro";
import { Button, Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const InitialDashboard = ({
  staffCount,
  projectCount,
}: {
  staffCount: any;
  projectCount: any;
}) => {
  const router = useRouter();

  const [activeProjectData, setActiveProjectData] = useState([]);

  useEffect(() => {
    getActiveProjectData();
  }, []);
  const getActiveProjectData = async () => {
    const fetchData = async () => {
      const response = await fetch("api/project/get-active-projects");
      const res = await response.json();
      // console.log("res", res);
      setActiveProjectData(res.activeProjects);
    };
    fetchData().catch(console.error);
  };
  return (
    <div>
      <div className="flex flex-col gap-1 pl-1 overflow-x-auto w-full sm:w-[80vw] sm:max-w-[80vw]">
        {activeProjectData.length == 0 ? (
          <DashboardIntro />
        ) : (
          <div className="flex gap-2 flex-wrap">
            <Card className="w-1/3">
              <CardBody>
                <span className="font-semibold text-blue-900 text-lg text-blueGray-700 border-b-2">
                  Staff details
                </span>
                <div className="flex mt-1">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-blue-500 mt-4">
                    <span className="flex items-center justify-center text-xl">
                      {staffCount}
                    </span>
                  </div>
                  <Button
                    color="primary"
                    className="absolute right-0 bottom-0 mb-4 mr-4 flex items-center"
                    size="sm"
                    variant="bordered"
                    // endContent={<MdGridView className="h-4 w-4" />}
                    onClick={() => router.push("/staff")}
                  >
                    View Details
                  </Button>
                </div>
              </CardBody>
            </Card>
            <Card className="w-1/3">
              <CardBody>
                <span className="font-semibold text-blue-900 text-lg text-blueGray-700 border-b-2">
                  Project details
                </span>
                <div className="flex mt-1">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-blue-400 mt-4">
                    <span className="flex items-center justify-center text-xl">
                      {projectCount}
                    </span>
                  </div>
                  <Button
                    color="primary"
                    className="absolute right-0 bottom-0 mb-4 mr-4 flex items-center"
                    size="sm"
                    variant="bordered"
                    // endContent={<MdGridView className="h-4 w-4" />}
                    onClick={() => router.push("/projects")}
                  >
                    View Details
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default InitialDashboard;
//get-active-projects
