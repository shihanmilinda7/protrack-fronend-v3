"use client";

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { inputFieldValidation } from "@/app/utils/utils";
import { Button, Pagination } from "@nextui-org/react";
import NextTextInputField from "../common-comp/nextui-input-fields/next-text-input-fields";
import { COUNTRIES } from "../country-selector/countries";
import { webSocket } from "@/web-socket";
import { ListboxWrapper } from "../common-comp/nextui-input-fields/ListboxWrapper";
import NextListView from "../common-comp/nextui-input-fields/next-listview";
import { MigrationHitoryTable } from "./migration-history-table";
import NextAreaTextInputField from "../common-comp/nextui-input-fields/next-textarea-input-fields";

const DatabaseMigration = () => {
  const [activeOrganizationsData, setActiveOrganizationsData] = useState<any>(
    []
  );
  const [pendingDatabaseMigrations, setPendingDatabaseMigrations] =
    useState<any>([]);
  const [dbmigrationCount, setDbmigrationCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMigrationCount, setTotalMigrationCount] = useState(1);
  const [migrationData, setMigrationData] = useState([]);
  const [querystring, setQuerystring] = useState("");

  useEffect(() => {
    getPendingDbmigrations();
    getMigrationData();
  }, [dbmigrationCount]);

  useEffect(() => {
    getActiveOrganizations();
  }, []);

  const getActiveOrganizations = async () => {
    const fetchData = async () => {
      const details = await fetch("api/organization/get-active-organizations");
      const res = await details.json();
      const tmpArray: any = [...res.activeOrganizations];
      setActiveOrganizationsData(tmpArray);
      //   const modifiedData = tmpArray?.map((s) => ({
      //     // name: s.staffname + " - " + s.designation + "",
      //     name: `${s.organizationname}`,
      //     value: s.organizationid,
      //   }));
      //   setActiveOrganizationsNameValuePair(modifiedData);
    };

    // call the function pendingOrganizations
    fetchData().catch(console.error);
  };

  const getMigrationData = async () => {
    const fetchData = async () => {
      const details = await fetch(
        "api/db-migrations/all-migrationdata?page-number=" + currentPage
      );
      const res = await details.json();
      console.log("res", res);
      setTotalMigrationCount(Math.ceil(res.migartionCount / 10));
      setMigrationData(res.migrations);
      //   const tmpArray: any = [...res.activeOrganizations];
      //   setActiveOrganizationsData(tmpArray);
      //   const modifiedData = tmpArray?.map((s) => ({
      //     // name: s.staffname + " - " + s.designation + "",
      //     name: `${s.organizationname}`,
      //     value: s.organizationid,
      //   }));
      //   setActiveOrganizationsNameValuePair(modifiedData);
    };

    // call the function pendingOrganizations
    fetchData().catch(console.error);
  };

  const getPendingDbmigrations = async () => {
    const fetchData = async () => {
      const details = await fetch("api/db-migrations");
      const res = await details.json();
      // const tmpArray: any = [...res.pendingDbmigrations];
      setPendingDatabaseMigrations(res.pendingDbmigrations);
    };

    // call the function pendingOrganizations
    fetchData().catch(console.error);
  };

  const runDbmigrations = async () => {
    const fetchData = async () => {
      const details = await fetch("api/db-migrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dbList: activeOrganizationsData,
          queryList: pendingDatabaseMigrations,
        }),
      });
      const res = await details.json();
      if (res == "SUCCESS") {
        toast.success("Migration run successfully!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setDbmigrationCount((prv) => prv + 1);
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

    // call the function pendingOrganizations
    fetchData().catch(console.error);
  };

  const addQuery = async () => {
    const Query = querystring;

    const validation = inputFieldValidation({
      Query,
    });
    try {
      //check input field empty or not
      if (validation == 0) {
        const responseNewStaff = await fetch(
          "api/db-migrations/all-migrationdata",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              querystring,
            }),
          }
        );
        const res = await responseNewStaff.json();
        if (res == "SUCCESS") {
          setDbmigrationCount((prv) => prv + 1);
          toast.success("Updated successfully!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          setQuerystring("");
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
  return (
    <div>
      <div className=" w-full">
        {/* <ListboxWrapper> */}
        <div className="flex gap-2 w-full">
          <div className="w-full">
            <div className="flex w-full">
              <div className="flex flex-col w-full gap-2">
                {/* <span className="text-sm font-semibold leading-none text-gray-900 select-none m-2">
                    <span className="text-indigo-600">
                      Pending migrations <br />
                    </span>
                  </span> */}
                <div>
                  {pendingDatabaseMigrations.length == 0 ? (
                    <span className="font-semibold text-sm mt-2">
                      No any migrations
                    </span>
                  ) : (
                    <div>
                      <span className="font-semibold text-sm mt-2 mr-2">
                        There are few migrations,
                      </span>
                      <Button color="primary" onClick={runDbmigrations}>
                        Migrate
                      </Button>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <NextAreaTextInputField
                    label="Query"
                    value={querystring}
                    onChange={(e) => setQuerystring(e.target.value)}
                  />
                  <Button color="primary" onClick={addQuery} className="h-full">
                    ADD
                  </Button>
                </div>
                <div className="w-full">
                  <MigrationHitoryTable rowData={migrationData} />
                  <div className="md:px-2 mt-3 flex item-center justify-center">
                    <Pagination
                      isCompact
                      showControls
                      total={totalMigrationCount}
                      page={currentPage}
                      onChange={setCurrentPage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </ListboxWrapper> */}
      </div>
    </div>
  );
};
export default DatabaseMigration;
