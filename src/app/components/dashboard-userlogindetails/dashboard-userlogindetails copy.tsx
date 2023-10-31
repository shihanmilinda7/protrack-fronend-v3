// "use client";

// import { useEffect, useState } from "react";
// import { UserListTable } from "../chatbox/userlist-table";
// import { calculateTotalHours } from "./utils";

// export const DashboardUserLoginTable = ({ toggleWs }: { toggleWs: any }) => {
//   //get pathname
//   let pathname: string = "";

//   try {
//     pathname = window.location.href;
//     // console.log("pathname1", window.location.href);
//   } catch (error) {}

//   if (pathname) {
//     const r: number = pathname.indexOf("/", 9);
//     if (r !== -1) {
//       pathname = pathname.substring(0, r);
//     }
//     // console.log("pathname", pathname);
//   }

//   const [userList, setUserList] = useState([]);
//   const [testSum, setTestSum] = useState<any>(0);
//   // const [activeUserList, setActiveuserList] = useState([]);

//   const [displayUserList, setDisplayUserList] = useState([]);

//   useEffect(() => {
//     console.log("toggleWs", toggleWs);
//     createUserList();
//     // getAssignedProjectDetails();
//   }, [toggleWs]);

//   const createUserList = async () => {
//     const allUsers = await getUserList();
//     const activeUsers = await getUserLoginDetails();

//     const tmpUserList = allUsers.map((u: any) => {
//       const result: any = activeUsers.find((u1: any) => u.userid === u1.userid);
//       return {
//         staffname: u.staffname,
//         status: result ? "Active" : "Inactive",
//         // taskname: pt.taskname,
//         // projecttaskassignid: findAssignTask
//         //   ? findAssignTask.projecttaskassignid
//         //   : 0,
//         // selected: findAssignTask ? true : false,
//       };
//     });
//     setDisplayUserList(tmpUserList);
//   };

//   const getUserList = async () => {
//     const reponse = await fetch("api/staff/get-userdata");
//     const res = await reponse.json();
//     // setUserList(res.users);
//     return res.users;
//   };

//   const getUserLoginDetails = async () => {
//     const reponse = await fetch(pathname + "/api/auth/login");
//     const res = await reponse.json();
//     // setUserList(res.userLoginDetails);
//     /////////////////////
//     const userTotalLoginHours = calculateTotalHours(res.userLoginDetails);
//     setTestSum(userTotalLoginHours);
//     //////////////////////
//     const filteredLoginDetails = res.userLoginDetails.filter(
//       (detail) => detail.logouttime == ""
//     );
//     // setActiveuserList(filteredLoginDetails);
//     return filteredLoginDetails;
//   };

//   return (
//     <div>
//       {JSON.stringify(testSum)}
//       <UserListTable userListIn={displayUserList} />;
//     </div>
//   );
// };
