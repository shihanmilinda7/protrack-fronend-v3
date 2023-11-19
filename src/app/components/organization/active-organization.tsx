"use client";

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { inputFieldValidation } from "@/app/utils/utils";
import { Button } from "@nextui-org/react";
import NextTextInputField from "../common-comp/nextui-input-fields/next-text-input-fields";
import { COUNTRIES } from "../country-selector/countries";
import { webSocket } from "@/web-socket";
import { ListboxWrapper } from "../common-comp/nextui-input-fields/ListboxWrapper";
import NextListView from "../common-comp/nextui-input-fields/next-listview";

const ActivateOrganization = () => {
  const [pendingOrganizationsData, setPendingOrganizationsData] = useState<any>(
    []
  );

  const [
    pendingOrganizationsNameValuePair,
    setPendingOrganizationsNameValuePair,
  ] = useState<any[]>([]);
  const [selectedOrgKey, setSelectedOrgKey] = useState(new Set([]));
  const [orgName, setOrgName] = useState("");
  const [orgCountry, setOrgCountry] = useState("");
  const [selOrg, setSelOrg] = useState<any>("");

  const [dbname, setDbname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const [requestCount, setRequestCount] = useState(1);

  const organizationid = React.useMemo(
    () => Array.from(selectedOrgKey).join(", "),
    [selectedOrgKey]
  );

  useEffect(() => {
    webSocket.emit("join_room", "publicroom");
  }, []);

  useEffect(() => {
    getPendingOrganizations();
  }, [requestCount]);

  useEffect(() => {
    suggestDbname();
  }, [orgName]);

  useEffect(() => {
    const isMatching = pendingOrganizationsData.find(
      (o) => o.organizationid == organizationid
    );
    if (isMatching) {
      setOrgName(isMatching.organizationname);
      setSelOrg(isMatching);
      const tmpValue = COUNTRIES.find((o) => o.value == isMatching.country);
      setOrgCountry(tmpValue.title);
    }
  }, [selectedOrgKey]);

  useEffect(() => {
    webSocket.on("receive_request_new_org", function (data) {
      setRequestCount((prv) => prv + 1);
    });

    return () => {
      webSocket.off("receive_request_new_org");
    };
  }, []);

  const getPendingOrganizations = async () => {
    const fetchData = async () => {
      const details = await fetch("api/organization");
      const res = await details.json();
      const tmpArray: any = [...res.pendingOrganizations];
      setPendingOrganizationsData(tmpArray);
      const modifiedData = tmpArray?.map((s) => ({
        // name: s.staffname + " - " + s.designation + "",
        name: `${s.organizationname}`,
        value: s.organizationid,
      }));
      setPendingOrganizationsNameValuePair(modifiedData);
    };

    // call the function pendingOrganizations
    fetchData().catch(console.error);
  };

  const createAdmin = async () => {
    const details = await fetch("api/copy-database", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dbname,
        password,
        organizationid,
        email: selOrg.adminemail,
        country: selOrg.country,
      }),
    });
    const res = await details.json();
    if (res == "SUCCESS") {
      toast.success("Organization created successfully!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setRequestCount((prv) => prv + 1);
      setSelectedOrgKey(new Set([]));
    } else {
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

  const copyDatabase = async () => {
    const fetchData = async () => {
      const details = await fetch("api/copy-database?dbname=" + dbname);
      const res = await details.json();

      if (res.message == "SUCCESS") {
        await createAdmin();
      } else {
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
    if (password != confirmpassword) {
      toast.info("Password does not match!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      fetchData().catch(console.error);
    }
  };

  const suggestDbname = () => {
    const cleanedStr = orgName.replace(/[^a-zA-Z0-9\s]/g, "");
    const words = cleanedStr.split(/\s+/);
    const suggestedName = words.join("");
    const suggestedNameLowercase = suggestedName.toLowerCase();
    setDbname(suggestedNameLowercase);
    return suggestedNameLowercase;
  };

  const dbnameValidation = async () => {
    const reponse = await fetch(
      "api/organization/dbname-validation?dbname=" + dbname
    );
    const res = await reponse.json();
    return res.message;
  };

  const activeBtnHandler = async () => {
    const Database_Name = dbname;
    const validation = inputFieldValidation({
      Database_Name,
      password,
    });

    if (validation == 0) {
      const dbnameResult = await dbnameValidation();
      if (dbnameResult == "EXISTS") {
        toast.info("Database name already exists!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        await copyDatabase();
      }
    }
  };
  return (
    <div>
      <div className="w-fit">
        <div className="flex gap-2">
          <div className="mr-4">
            <div className="flex">
              <div className="flex flex-col">
                {/* <span className="text-sm font-semibold leading-none text-gray-900 select-none mt-2 mr-2 ml-2">
                  <span className="text-indigo-600">
                    Pending approval <br /> organization
                  </span>
                </span> */}
                <NextListView
                  value={selectedOrgKey}
                  onChange={setSelectedOrgKey}
                  listArray={pendingOrganizationsNameValuePair}
                />
                {pendingOrganizationsNameValuePair.length == 0 ? (
                  <span className="ml-2 font-semibold text-sm">
                    No requests
                  </span>
                ) : null}
              </div>
            </div>
          </div>
          <div className={`${organizationid ? "flex flex-col" : "hidden"}`}>
            <div className="flex">
              <div className="flex flex-col w-full">
                <span className="text-sm font-semibold leading-none text-gray-900 select-none m-2">
                  <span className="text-indigo-600">
                    Organization Name :{orgName}
                  </span>
                </span>
                <div className="flex m-2 w-full">
                  <div className="flex gap-2 flex-col mr-8">
                    <span className="font-semibold text-sm">
                      Name :<span className="text-sm">{selOrg.name}</span>
                    </span>

                    <span className="font-semibold text-sm">
                      Country :<span className="text-sm">{orgCountry}</span>
                    </span>

                    <span className="font-semibold text-sm">
                      Company email :
                      <span className="text-sm">{selOrg.companyemail}</span>
                    </span>

                    <span className="font-semibold text-sm">
                      Admin email :
                      <span className="text-sm">{selOrg.adminemail}</span>
                    </span>

                    <span className="font-semibold text-sm">
                      Address :<span className="text-sm">{selOrg.address}</span>
                    </span>
                  </div>

                  <div className="flex gap-2 flex-col">
                    <span className="font-semibold text-sm">
                      Email :<span className="text-sm">{selOrg.email}</span>
                    </span>

                    <span className="font-semibold text-sm">
                      Contact No :
                      <span className="text-sm">{selOrg.contactno}</span>
                    </span>
                  </div>
                  <div className="flex flex-col ml-4 gap-2">
                    <NextTextInputField
                      label="Database name"
                      value={dbname}
                      onChange={(e) => setDbname(e.target.value)}
                      color="primary"
                    />
                    <NextTextInputField
                      label="Admin password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      color="primary"
                    />
                    <NextTextInputField
                      label="Confirm admin password"
                      value={confirmpassword}
                      onChange={(e) => setConfirmpassword(e.target.value)}
                      color="primary"
                    />
                    <Button color="primary" onClick={activeBtnHandler}>
                      Active organization
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ActivateOrganization;
