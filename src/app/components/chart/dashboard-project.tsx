"use client";

import { Card, CardBody } from "@nextui-org/react";
import { useEffect, useState } from "react";
import ChartProjectTask from "./dashboard-project-task";
import { ListboxWrapperType1 } from "../dashboard-userlogindetails/ListboxWrapperType1";

const ChartProject = ({ projectDetails }: { projectDetails?: any }) => {
  const [activeProject, setActiveProject] = useState<any>({});

  useEffect(() => {
    const q = { ...projectDetails };
    setActiveProject(q);
  }, [projectDetails]);
  return (
    <div className="w-full overflow-x-auto">
      <ListboxWrapperType1>
        <h1 className="text-xl text-blue-800">{activeProject.projectname}</h1>
        <div className="flex gap-1 flex-wrap sm:flex-nowrap">
          {activeProject.projecttasks?.map((p) => (
            <ChartProjectTask taskDetailsIn={p} />
          ))}
        </div>
      </ListboxWrapperType1>
    </div>
  );
};

export default ChartProject;
