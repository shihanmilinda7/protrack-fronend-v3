"use client";

import { useEffect, useState } from "react";
import ChartProject from "./dashboard-project";

const ChartDashboard = () => {
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
      <div className="flex flex-col gap-1 pl-1 max-w-[80vw] overflow-x-auto">
        {activeProjectData?.map((p) => (
          <ChartProject projectDetails={p} />
        ))}
      </div>
    </div>
  );
};

export default ChartDashboard;
//get-active-projects
