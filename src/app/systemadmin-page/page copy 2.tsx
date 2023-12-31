// "use client";

// import React, { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { WithRole } from "../components/common-comp/withRole";
// import Spinner from "../dashboard/loading";
// import { ListboxWrapper } from "../components/common-comp/nextui-input-fields/ListboxWrapper";
// import NextListView from "../components/common-comp/nextui-input-fields/next-listview";
// import { Button } from "@nextui-org/react";
// import { COUNTRIES } from "../components/country-selector/countries";
// import NextTextInputField from "../components/common-comp/nextui-input-fields/next-text-input-fields";
// import { inputFieldValidation } from "../utils/utils";
// import { toast } from "react-toastify";
// import { webSocket } from "@/web-socket";

// export default function SystemAdmin() {
//   const router = useRouter();
//   const { data: session, status } = useSession();

//   const [pendingOrganizationsData, setPendingOrganizationsData] = useState<any>(
//     []
//   );
//   const [activeOrganizationsData, setActiveOrganizationsData] = useState<any>(
//     []
//   );
//   const [
//     activeOrganizationsNameValuePair,
//     setActiveOrganizationsNameValuePair,
//   ] = useState<any>([]);
//   const [pendingDatabaseMigrations, setPendingDatabaseMigrations] =
//     useState<any>([]);

//   const [
//     pendingOrganizationsNameValuePair,
//     setPendingOrganizationsNameValuePair,
//   ] = useState<any[]>([]);
//   const [selectedOrgKey, setSelectedOrgKey] = useState(new Set([]));
//   const [selectedOrgKey1, setSelectedOrgKey1] = useState(new Set([]));
//   const [orgName, setOrgName] = useState("");
//   const [orgCountry, setOrgCountry] = useState("");
//   const [selOrg, setSelOrg] = useState<any>("");

//   const [dbname, setDbname] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmpassword, setConfirmpassword] = useState("");

//   const [requestCount, setRequestCount] = useState(1);
//   const [dbmigrationCount, setDbmigrationCount] = useState(1);

//   const organizationid = React.useMemo(
//     () => Array.from(selectedOrgKey).join(", "),
//     [selectedOrgKey]
//   );
//   const organizationid1 = React.useMemo(
//     () => Array.from(selectedOrgKey1).join(", "),
//     [selectedOrgKey1]
//   );

//   useEffect(() => {
//     webSocket.emit("join_room", "publicroom");
//   }, []);

//   useEffect(() => {
//     getPendingOrganizations();
//     getActiveOrganizations();
//   }, [requestCount]);

//   useEffect(() => {
//     getPendingDbmigrations();
//   }, [dbmigrationCount]);

//   useEffect(() => {
//     suggestDbname();
//   }, [orgName]);

//   useEffect(() => {
//     const isMatching = pendingOrganizationsData.find(
//       (o) => o.organizationid == organizationid
//     );
//     if (isMatching) {
//       setOrgName(isMatching.organizationname);
//       setSelOrg(isMatching);
//       const tmpValue = COUNTRIES.find((o) => o.value == isMatching.country);
//       setOrgCountry(tmpValue.title);
//     }
//   }, [selectedOrgKey]);

//   useEffect(() => {
//     webSocket.on("receive_request_new_org", function (data) {
//       setRequestCount((prv) => prv + 1);
//     });

//     return () => {
//       webSocket.off("receive_request_new_org");
//     };
//   }, []);

//   const getPendingOrganizations = async () => {
//     const fetchData = async () => {
//       const details = await fetch("api/organization");
//       const res = await details.json();
//       const tmpArray: any = [...res.pendingOrganizations];
//       setPendingOrganizationsData(tmpArray);
//       const modifiedData = tmpArray?.map((s) => ({
//         // name: s.staffname + " - " + s.designation + "",
//         name: `${s.organizationname}`,
//         value: s.organizationid,
//       }));
//       setPendingOrganizationsNameValuePair(modifiedData);
//     };

//     // call the function pendingOrganizations
//     fetchData().catch(console.error);
//   };

//   const getActiveOrganizations = async () => {
//     const fetchData = async () => {
//       const details = await fetch("api/organization/get-active-organizations");
//       const res = await details.json();
//       const tmpArray: any = [...res.activeOrganizations];
//       setActiveOrganizationsData(tmpArray);
//       const modifiedData = tmpArray?.map((s) => ({
//         // name: s.staffname + " - " + s.designation + "",
//         name: `${s.organizationname}`,
//         value: s.organizationid,
//       }));
//       setActiveOrganizationsNameValuePair(modifiedData);
//     };

//     // call the function pendingOrganizations
//     fetchData().catch(console.error);
//   };

//   const getPendingDbmigrations = async () => {
//     const fetchData = async () => {
//       const details = await fetch("api/db-migrations");
//       const res = await details.json();
//       // const tmpArray: any = [...res.pendingDbmigrations];
//       console.log("res.pendingDbmigration", res);
//       setPendingDatabaseMigrations(res.pendingDbmigrations);
//     };

//     // call the function pendingOrganizations
//     fetchData().catch(console.error);
//   };

//   const runDbmigrations = async () => {
//     const fetchData = async () => {
//       const details = await fetch("api/db-migrations", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           dbList: activeOrganizationsData,
//           queryList: pendingDatabaseMigrations,
//         }),
//       });
//       const res = await details.json();
//       if (res == "SUCCESS") {
//         toast.success("Migration run successfully!", {
//           position: "top-right",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//         setDbmigrationCount((prv) => prv + 1);
//       } else {
//         toast.error("Error!", {
//           position: "top-right",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//       }
//     };

//     // call the function pendingOrganizations
//     fetchData().catch(console.error);
//   };

//   const createAdmin = async () => {
//     const details = await fetch("api/copy-database", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         dbname,
//         password,
//         organizationid,
//         email: selOrg.adminemail,
//         country: selOrg.country,
//       }),
//     });
//     const res = await details.json();
//     if (res == "SUCCESS") {
//       toast.success("Organization created successfully!", {
//         position: "top-right",
//         autoClose: 1000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//       setRequestCount((prv) => prv + 1);
//       setSelectedOrgKey(new Set([]));
//     } else {
//       toast.error("Error!", {
//         position: "top-right",
//         autoClose: 1000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//     }
//   };

//   const copyDatabase = async () => {
//     const fetchData = async () => {
//       const details = await fetch("api/copy-database?dbname=" + dbname);
//       const res = await details.json();

//       if (res.message == "SUCCESS") {
//         await createAdmin();
//       } else {
//         toast.error("Error!", {
//           position: "top-right",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//       }
//     };
//     if (password != confirmpassword) {
//       toast.info("Password does not match!", {
//         position: "top-right",
//         autoClose: 1000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: false,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//     } else {
//       fetchData().catch(console.error);
//     }
//   };

//   const suggestDbname = () => {
//     const cleanedStr = orgName.replace(/[^a-zA-Z0-9\s]/g, "");
//     const words = cleanedStr.split(/\s+/);
//     const suggestedName = words.join("");
//     const suggestedNameLowercase = suggestedName.toLowerCase();
//     setDbname(suggestedNameLowercase);
//     return suggestedNameLowercase;
//   };

//   const dbnameValidation = async () => {
//     const reponse = await fetch(
//       "api/organization/dbname-validation?dbname=" + dbname
//     );
//     const res = await reponse.json();
//     return res.message;
//   };

//   const activeBtnHandler = async () => {
//     const Database_Name = dbname;
//     const validation = inputFieldValidation({
//       Database_Name,
//       password,
//     });

//     if (validation == 0) {
//       const dbnameResult = await dbnameValidation();
//       if (dbnameResult == "EXISTS") {
//         toast.info("Database name already exists!", {
//           position: "top-right",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: false,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//       } else {
//         await copyDatabase();
//       }
//     }
//   };

//   if (status === "loading") {
//     return (
//       <div>
//         <Spinner />
//       </div>
//     );
//   }

//   if (!session) {
//     router.push("/"); // Redirect to login page if not authenticated
//     return null;
//   }
//   return (
//     <WithRole roles={["systemadmin"]}>
//       <div className="w-full flex">
//         <div className="m-4 flex flex-col gap-2 w-[80vw]">
//           <div className="w-fit">
//             <ListboxWrapper>
//               <div className="flex gap-2">
//                 <div className="mr-4">
//                   <div className="flex">
//                     <div className="flex flex-col">
//                       <span className="text-sm font-semibold leading-none text-gray-900 select-none mt-2 mr-2 ml-2">
//                         <span className="text-indigo-600">
//                           Pending approval <br /> organization
//                         </span>
//                       </span>
//                       <NextListView
//                         value={selectedOrgKey}
//                         onChange={setSelectedOrgKey}
//                         listArray={pendingOrganizationsNameValuePair}
//                       />
//                       {pendingOrganizationsNameValuePair.length == 0 ? (
//                         <span className="ml-2 font-semibold text-sm">
//                           No requests
//                         </span>
//                       ) : null}
//                     </div>
//                   </div>
//                   {/* </ListboxWrapper> */}
//                 </div>
//                 <div
//                   className={`${organizationid ? "flex flex-col" : "hidden"}`}
//                 >
//                   {/* <ListboxWrapper> */}
//                   <div className="flex">
//                     <div className="flex flex-col w-full">
//                       <span className="text-sm font-semibold leading-none text-gray-900 select-none m-2">
//                         <span className="text-indigo-600">
//                           Organization Name :{orgName}
//                         </span>
//                       </span>
//                       <div className="flex m-2 w-full">
//                         <div className="flex gap-2 flex-col mr-8">
//                           <span className="font-semibold text-sm">
//                             Name :<span className="text-sm">{selOrg.name}</span>
//                           </span>

//                           <span className="font-semibold text-sm">
//                             Country :
//                             <span className="text-sm">{orgCountry}</span>
//                           </span>

//                           <span className="font-semibold text-sm">
//                             Company email :
//                             <span className="text-sm">
//                               {selOrg.companyemail}
//                             </span>
//                           </span>

//                           <span className="font-semibold text-sm">
//                             Admin email :
//                             <span className="text-sm">{selOrg.adminemail}</span>
//                           </span>

//                           <span className="font-semibold text-sm">
//                             Address :
//                             <span className="text-sm">{selOrg.address}</span>
//                           </span>
//                         </div>

//                         <div className="flex gap-2 flex-col">
//                           <span className="font-semibold text-sm">
//                             Email :
//                             <span className="text-sm">{selOrg.email}</span>
//                           </span>

//                           <span className="font-semibold text-sm">
//                             Contact No :
//                             <span className="text-sm">{selOrg.contactno}</span>
//                           </span>
//                         </div>
//                         <div className="flex flex-col ml-4 gap-2">
//                           <NextTextInputField
//                             label="Database name"
//                             value={dbname}
//                             onChange={(e) => setDbname(e.target.value)}
//                             color="primary"
//                           />
//                           <NextTextInputField
//                             label="Admin password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             color="primary"
//                           />
//                           <NextTextInputField
//                             label="Confirm admin password"
//                             value={confirmpassword}
//                             onChange={(e) => setConfirmpassword(e.target.value)}
//                             color="primary"
//                           />
//                           <Button color="primary" onClick={activeBtnHandler}>
//                             Active organization
//                           </Button>
//                         </div>
//                       </div>
//                       {/* <div className="flex m-2 gap-2">
//                     <NextTextInputField
//                       label="Database name"
//                       value={dbname}
//                       onChange={(e) => setDbname(e.target.value)}
//                       color="primary" pendingDatabaseMigrations
//                     />
//                   </div> */}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </ListboxWrapper>
//           </div>
//           <div className="w-fit">
//             <ListboxWrapper>
//               <div className="flex gap-2">
//                 <div className="m-1">
//                   <div className="flex">
//                     <div className="flex flex-col">
//                       <span className="text-sm font-semibold leading-none text-gray-900 select-none m-2">
//                         <span className="text-indigo-600">
//                           Pending migrations <br />
//                         </span>
//                       </span>
//                       {pendingDatabaseMigrations.length == 0 ? (
//                         <span className="ml-2 font-semibold text-sm mt-2">
//                           No any migrations
//                         </span>
//                       ) : (
//                         <Button color="primary" onClick={runDbmigrations}>
//                           Active organization
//                         </Button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </ListboxWrapper>
//           </div>
//         </div>
//         <div className="w-[20vw] m-4">
//           <ListboxWrapper>
//             <div className="flex gap-2">
//               <div className="mr-4">
//                 <div className="flex">
//                   <div className="flex flex-col">
//                     <span className="text-sm font-semibold leading-none text-gray-900 select-none mt-2 mr-2 ml-2">
//                       <span className="text-indigo-600">
//                         Active organizations
//                       </span>
//                     </span>
//                     <NextListView
//                       value={selectedOrgKey1}
//                       onChange={setSelectedOrgKey1}
//                       listArray={activeOrganizationsNameValuePair}
//                     />
//                     {activeOrganizationsNameValuePair.length == 0 ? (
//                       <span className="ml-2 font-semibold text-sm">
//                         No data
//                       </span>
//                     ) : null}
//                   </div>
//                 </div>
//                 {/* </ListboxWrapper> */}
//               </div>
//             </div>
//           </ListboxWrapper>
//         </div>
//       </div>
//     </WithRole>
//   );
// }
