"use client";

import NextAutoFocusTextInputField from "@/app/components/common-comp/nextui-input-fields/next-autofocus-text-input-fields";
import NextDateInputField from "@/app/components/common-comp/nextui-input-fields/next-date-input-fields";
import NextSelectInputField from "@/app/components/common-comp/nextui-input-fields/next-select-input-fields";
import NextAreaTextInputField from "@/app/components/common-comp/nextui-input-fields/next-textarea-input-fields";
import { WithRole } from "@/app/components/common-comp/withRole";
import Navbar from "@/app/components/navbar/navbar";
import NewProjectTask from "@/app/components/project/project-task-addnew";
import { ProjectTaskTable } from "@/app/components/project/project-task-table";
import { TaskObjectTypes } from "@/app/components/project/types";
import { handleSelectChangeEvent } from "@/app/components/utils";
import Spinner from "@/app/dashboard/loading";
import { inputFieldValidation } from "@/app/utils/utils";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Input } from "@nextui-org/react";
import ConfirmAlertbox from "@/app/components/common-comp/confirm-alertbox";
import ProjectAssignScreen from "@/app/components/project/project-assign";
import { setCurPrjTaskRowOj } from "@/store/projectAssignSaveSlice";
import { useDispatch } from "react-redux";
import { MdOutlineArrowBack } from "react-icons/md";
import SearchFilter from "@/app/components/common-comp/input-fields/search-filter";
import { FaSearch } from "react-icons/fa";
import IconConfirmAlertbox from "@/app/components/common-comp/icon-confirm-alertbox";

import timezones from "timezones-list";
import { useSelector } from "react-redux";
import NextNumberInputField from "@/app/components/common-comp/nextui-input-fields/next-number-input-fields";
import ProjectAssignScreenV1 from "@/app/components/project/project-assign-v1";

export default function NewProject() {
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
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session, status } = useSession();
  const userRole = session?.user?.role;

  //define state variables
  // const [reloadTable, setReloadTable] = useState(false);

  const taskItemList = useSelector(
    (state: any) => state.projectReducer.taskItemList
  );

  const searchParams = useSearchParams();
  const selProjectid = searchParams.get("projectid");

  const [projectid, setProjectid] = useState("");
  const [projectname, setProjectname] = useState("");
  const [projectdescription, setProjectdescription] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [datecount, setDatecount] = useState<any>(0);
  const [projectstatus, setProjectstatus] = useState(new Set([]));
  // const [pageReload, setPageReload] = useState(false);
  const [search, setSearch] = useState("");
  const [taskRowObjects, setTaskRowObjects] = useState<any[]>([]);
  const [updateScreen, setUpdateScreen] = useState(false);
  const [updatePrpjectId, setUpdatePrpjectId] = useState(false);
  const [updateDate, setUpdateDate] = useState(1);

  const [addMemberPopup, setAddMemberPopup] = useState(false);

  /////////////////////
  const [userTimeZone, setUserTimeZone] = useState<string | null>(null);

  useEffect(() => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTimeZone(userTimeZone);
  }, []);
  //////////////////////

  useEffect(() => {
    const differenceInDays = getDateDifference(enddate, startdate);
    dateCountChangeEvent(differenceInDays);
  }, [startdate, enddate]);

  useEffect(() => {
    // console.log("selProjectid", selProjectid);
    setProjectid(selProjectid);
    toggleAssignSave();
  }, [selProjectid]);

  useEffect(() => {
    setUpdatePrpjectId((prv: boolean) => !prv);
  }, [projectid]);

  // useEffect(() => {
  //   setEnddate(enddate1);
  // }, [enddate1]);

  useEffect(() => {
    const tmpStartDate = new Date(startdate);
    const resultDate = new Date(tmpStartDate);
    resultDate.setDate(tmpStartDate.getDate() + datecount * 1);
    const year = resultDate.getFullYear();
    const month = (resultDate.getMonth() + 1).toString().padStart(2, "0");
    const day = resultDate.getDate().toString().padStart(2, "0");
    const formattedItemDate = `${year}-${month}-${day}`;
    setEnddate(formattedItemDate);
    // setEnddate(formattedItemDate);
  }, [updateDate]);

  const dateCountChangeEvent = (value) => {
    setDatecount(value);
    setUpdateDate((prv: any) => prv + 1);
  };

  /////////////////////
  // useEffect(() => {
  //   console.log("startdate", startdate);
  //   const differenceInDays = getDateDifference(enddate, startdate);
  //   setDatecount(differenceInDays);
  // }, [updateDate]);

  // useEffect(() => {
  //   const tmpStartDate = new Date(startdate);
  //   const resultDate = new Date(tmpStartDate);
  //   resultDate.setDate(tmpStartDate.getDate() + datecount * 1);
  //   const year = resultDate.getFullYear();
  //   const month = (resultDate.getMonth() + 1).toString().padStart(2, "0");
  //   const day = resultDate.getDate().toString().padStart(2, "0");
  //   const formattedItemDate = `${year}-${month}-${day}`;
  //   setEnddate(formattedItemDate);
  //   setUpdateDate((prv: boolean) => !prv);
  // }, [datecount, startdate]);
  //////////////////////

  const toggleAssignSave = () => {
    setUpdateScreen((prv: boolean) => !prv);
  };

  const toggleAddMemberPopup = () => {
    setAddMemberPopup(false);
  };

  const statusOptionValues = [
    { value: "Pending", name: "Pending" },
    { value: "Started", name: "Started" },
    { value: "End", name: "End" },
    { value: "Suspended", name: "Suspended" },
  ];

  const updateTaskRowObjectArray = (
    tasks?: any,
    index?: number,
    options?: { deleteTask?: boolean; deltaskid?: number }
  ) => {
    const tmpArray: any = [...taskRowObjects];

    if (options?.deleteTask) {
      if (index || index == 0) {
        if (!options?.deltaskid) {
          tmpArray.splice(index, 1);
          setTaskRowObjects(tmpArray);
        } else {
          tmpArray[index]["rowStatus"] = "deleted";
          setTaskRowObjects(tmpArray);
        }
      }
    } else {
      if (tasks) {
        if (index || index == 0) {
          const keys: any = Object.keys(tasks);
          keys.forEach((key: any) => {
            tmpArray[index][key] = tasks[key];
          });
          setTaskRowObjects(tmpArray);
        } else {
          //update display object
          tasks.assignmembers = [];
          tmpArray.unshift(tasks);
          // tmpArray.push(tasks);
          setTaskRowObjects(tmpArray);
          //update initial object
        }
      }
    }
  };

  //for states update
  useEffect(() => {
    // // declare the data fetching function
    // const timeZone = "America/New_York";

    // // Create a new Date object with the specified time zone
    // const date = new Date();
    // const options: any = { timeZone, timeStyle: "long", hour12: false };
    // const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    //   date
    // );

    // console.log(`Current time in ${timeZone}: ${formattedDate}`);
    // console.log("timezones", timezones);
    /////////////////////////////////////////////
    if (projectid) {
      const fetchData = async () => {
        const reponse = await fetch(
          pathname + "/api/project/get-as-project?projectid=" + projectid
        );
        const res = await reponse.json();
        // console.log("res", res);
        const project = res.project[0];
        let projectTasks = res.projectTasks;
        // console.log("project.projectid", projectTasks);
        //update states
        setProjectid(project.projectid);
        setProjectname(project.projectname);
        setProjectdescription(project.projectdescription);
        setStartdate(project.startdate);
        setEnddate(project.enddate);
        setProjectstatus(new Set([project.projectstatus]));

        // ////////set date count
        // const date1: any = new Date(project.enddate);
        // const date2: any = new Date(project.startdate);
        // const differenceMilliseconds: any = date1 - date2;

        // const differenceInDays = Math.abs(
        //   differenceMilliseconds / (1000 * 60 * 60 * 24)
        // );
        const differenceInDays = getDateDifference(
          project.enddate,
          project.startdate
        );
        dateCountChangeEvent(differenceInDays);

        projectTasks = projectTasks.map((t) => {
          return { ...t, show: true };
        });
        setTaskRowObjects(projectTasks);
        // setPageReload(true)  project.projectstatus
      };

      // call the function
      fetchData().catch(console.error);
    }
  }, [updateScreen, updatePrpjectId]);

  const cancelButton = () => {
    dispatch(setCurPrjTaskRowOj([]));

    router.push("/project");
  };

  const submitButtonHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!projectid) {
      await addnew();
    } else {
      await update();
    }
    dispatch(setCurPrjTaskRowOj([]));
  };

  //add new project action
  const addnew = async () => {
    const validation = inputFieldValidation({
      projectname,
      projectdescription,
      startdate,
      enddate,
    });
    try {
      //check input field empty or not
      if (validation == 0) {
        if (taskRowObjects.length > 0) {
          //api call
          const response = await fetch(
            pathname + "/api/project/get-as-project",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                projectname,
                projectdescription,
                startdate,
                enddate,
                projectstatus: projectstatus.values().next().value,
                taskRowObjects,
              }),
            }
          );
          const jsonResponse = await response.json();

          if (jsonResponse.message == "SUCCESS") {
            toast.success("Project created successfully!", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            // router.push("/project");
            router.push(
              "/project/new-project?projectid=" + jsonResponse.newProjectId
            );
            setProjectid(jsonResponse.newProjectId);
            toggleAssignSave();
          }
        } else {
          toast.info("Project should be contain at least one task!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }
    } catch (error) {
      toast.error("Error!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  //add new project action
  const addnew1 = async () => {
    const validation = inputFieldValidation({
      projectname,
      projectdescription,
      startdate,
      enddate,
    });
    try {
      //check input field empty or not
      if (validation == 0) {
        if (taskRowObjects.length > 0) {
          //api call
          const response = await fetch(
            pathname + "/api/project/get-as-project",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                projectname,
                projectdescription,
                startdate,
                enddate,
                projectstatus: projectstatus.values().next().value,
                taskRowObjects,
              }),
            }
          );
          const jsonResponse = await response.json();

          if (jsonResponse.message == "SUCCESS") {
            // router.push("/project");
            router.push(
              "/project/new-project?projectid=" + jsonResponse.newProjectId
            );
            setProjectid(jsonResponse.newProjectId);
            toggleAssignSave();
            setAddMemberPopup(true);
          }
        } else {
          toast.info("Project should be contain at least one task!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }
    } catch (error) {
      toast.error("Error!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  //update project action
  const update = async () => {
    const validation = inputFieldValidation({
      projectname,
      projectdescription,
      startdate,
      enddate,
    });
    try {
      //check input field empty or not
      if (validation == 0) {
        if (taskRowObjects.length > 0) {
          //api call
          const response = await fetch(
            pathname + "/api/project/get-as-project",
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                projectid,
                projectname,
                projectdescription,
                startdate,
                enddate,
                projectstatus: projectstatus.values().next().value,
                taskRowObjects,
              }),
            }
          );
          const jsonResponse = await response.json();

          if (jsonResponse == "SUCCESS") {
            toast.success("Project updated successfully!", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            // router.push("/project");
            toggleAssignSave();
            // router.push("/project/new-project?projectid=" + projectid);
          }
        } else {
          toast.info("Project should be contain at least one task!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }
    } catch (error) {
      toast.error("Error!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  //update project action
  const update1 = async () => {
    const validation = inputFieldValidation({
      projectname,
      projectdescription,
      startdate,
      enddate,
    });
    try {
      //check input field empty or not
      if (validation == 0) {
        if (taskRowObjects.length > 0) {
          //api call
          const response = await fetch(
            pathname + "/api/project/get-as-project",
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                projectid,
                projectname,
                projectdescription,
                startdate,
                enddate,
                projectstatus: projectstatus.values().next().value,
                taskRowObjects,
              }),
            }
          );
          const jsonResponse = await response.json();

          if (jsonResponse == "SUCCESS") {
            setAddMemberPopup(true);
            toggleAssignSave();
          }
        } else {
          toast.info("Project should be contain at least one task!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }
    } catch (error) {
      toast.error("Error!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const searchEvent = (e) => {
    setSearch(e.target.value);
    const tmpArray = [...taskRowObjects];
    tmpArray.forEach((obj) => {
      if (obj.taskname.search(e.target.value) == -1) {
        obj.show = false;
      } else {
        obj.show = true;
      }
    });
    setTaskRowObjects(tmpArray);
  };

  const deleteAction = async () => {
    if (projectid) {
      const responseDel = await fetch(
        pathname + "/api/project/get-as-project",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectid }),
        }
      );

      const res = await responseDel.json();
      if (res == "SUCCESS") {
        toast.success("Project deleted successfully!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        router.push("/project");
      } else {
        toast.error("Error!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      router.push("/project");
    }
  };

  const getDateDifference = (tmpenddate, tmpstartdate) => {
    const date1: any = new Date(tmpenddate);
    const date2: any = new Date(tmpstartdate);
    const differenceMilliseconds: any = date1 - date2;

    const differenceInDays = Math.abs(
      differenceMilliseconds / (1000 * 60 * 60 * 24)
    );
    return differenceInDays;
  };

  const handleFocus = (event) => {
    event.target.select();
  };

  // const handleAddMember = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   submitButtonHandler(e);
  // };

  // const handleAddMember = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   toast.warning(
  //     "Need to save changes to add members. Do you want to proceed?",
  //     {
  //       position: toast.POSITION.TOP_CENTER,
  //       autoClose: false, // This ensures the notification doesn't auto-close
  //       closeOnClick: false, // This prevents the notification from closing when clicked
  //       closeButton: (
  //         <div>
  //           <Button color="default" onClick={confirmHandler} className="mb-1">
  //             Yes
  //           </Button>
  //           <Button
  //             color="danger"
  //             onClick={() => {
  //               toast.dismiss();
  //             }}
  //           >
  //             No
  //           </Button>
  //         </div>
  //       ),
  //     }
  //   );
  // };

  const handleAddMember = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("addMemberPopup", addMemberPopup);
    if (!projectid) {
      await addnew1();
    } else {
      await update1();
    }
    dispatch(setCurPrjTaskRowOj([]));
  };

  if (status === "loading") {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (!session) {
    router.push("/"); // Redirect to login page if not authenticated
    return null;
  }

  return (
    <WithRole roles={["Admin", "Manager", "User", "systemadmin"]}>
      <div>
        <Navbar />
        <div className="">
          <div className="flex items-center justify-center p-2">
            <div className="pt-2 mr-2">
              <Button
                color="primary"
                onClick={cancelButton}
                variant="bordered"
                startContent={
                  <MdOutlineArrowBack className="inline-block h-5 w-5" />
                }
              >
                Go back
              </Button>
            </div>
            <span className="text-2xl font-semibold leading-none text-gray-900 select-none pt-2 mr-auto">
              <span className="text-indigo-600">
                {!projectid ? "New Project" : "Project - " + projectname}
              </span>
            </span>
            {userRole == "User" ? null : (
              <div>
                <ProjectAssignScreenV1
                  openPopup={addMemberPopup}
                  projectid={projectid}
                  projectname={projectname}
                  projectTasks={taskRowObjects}
                  updateMainScreen={toggleAssignSave}
                  toggleAddMemberPopup={toggleAddMemberPopup}
                />
                <Button color="warning" onClick={handleAddMember}>
                  Add member
                </Button>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center p-2">
            <div className="mx-auto w-full flex flex-wrap">
              <div
                className={
                  userRole == "User"
                    ? "pointer-events-none mx-auto w-full flex flex-wrap gap-2 sm:flex-nowrap flex-col"
                    : "mx-auto w-full flex flex-wrap gap-2 sm:flex-nowrap flex-col"
                }
              >
                <div className="mx-auto w-full flex flex-wrap gap-2 sm:flex-nowrap">
                  <div className="w-full sm:w-1/4">
                    <NextAutoFocusTextInputField
                      label="Project Name"
                      value={projectname}
                      onChange={(e) => setProjectname(e.target.value)}
                    />
                  </div>
                  <div className="w-full sm:w-1/4">
                    <NextDateInputField
                      label="Start Date"
                      value={startdate}
                      onChange={(e) => setStartdate(e.target.value)}
                    />
                  </div>
                  <div className="w-full sm:w-1/4 flex gap-2">
                    <div className="w-full sm:w-3/5">
                      <NextDateInputField
                        label="End Date"
                        value={enddate}
                        onChange={(e) => setEnddate(e.target.value)}
                      />
                    </div>
                    <span className="flex inline-block items-center justify-center font-semibold">
                      OR
                    </span>
                    <div className="w-full sm:w-2/5">
                      <Input
                        type="number"
                        variant="flat"
                        label="No. of dates"
                        size="sm"
                        placeholder="Type here..."
                        value={datecount}
                        onChange={(e) => dateCountChangeEvent(e.target.value)}
                        onFocus={handleFocus}
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-1/4">
                    <NextSelectInputField
                      label="Project Status"
                      value={projectstatus}
                      onChange={(e) =>
                        handleSelectChangeEvent(
                          e,
                          setProjectstatus,
                          projectstatus
                        )
                      }
                      optionValues={statusOptionValues}
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-4 w-full mt-3">
                    <NextAreaTextInputField
                      label="Project Description"
                      value={projectdescription}
                      onChange={(e) => setProjectdescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex px-3 w-full items-center justify-center">
                <span className="text-xl font-semibold leading-none text-gray-900 select-none mr-2 pt-1">
                  <span className="text-indigo-600">Task list</span>
                </span>
                <div className="mr-auto">
                  <Input
                    autoFocus
                    isClearable
                    startContent={
                      <FaSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    color="primary"
                    label=""
                    placeholder="Type to search..."
                    variant="flat"
                    value={search}
                    onChange={(e) => searchEvent(e)}
                    onClear={() => setSearch("")}
                  />
                </div>
                <div className={userRole == "User" ? "hidden" : "ml-auto"}>
                  <NewProjectTask
                    arrayUpdateFuntion={updateTaskRowObjectArray}
                    buttonName="New task"
                  />
                </div>
              </div>
              <div className="w-full max-h-[400px] overflow-y-auto">
                <ProjectTaskTable
                  taskRowObjects={taskRowObjects}
                  arrayUpdateFuntion={updateTaskRowObjectArray}
                />
              </div>
              <div className="flex px-3 w-full mt-2">
                <div
                  className={
                    userRole == "User" || !projectid ? "hidden" : "ml-auto"
                  }
                >
                  <IconConfirmAlertbox
                    buttonName="Delete"
                    leftButtonAction={deleteAction}
                    description="Do you want to delete this record ?"
                  />
                </div>
                <div
                  className={
                    userRole == "User" || !projectid ? "ml-auto" : "ml-3"
                  }
                >
                  <ConfirmAlertbox
                    buttonName="Cancel"
                    leftButtonAction={cancelButton}
                    description="Do you want cancel?"
                  />
                </div>

                <div className={userRole == "User" ? "hidden" : "ml-3"}>
                  <Button color="success" onClick={submitButtonHandler}>
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WithRole>
  );
}
