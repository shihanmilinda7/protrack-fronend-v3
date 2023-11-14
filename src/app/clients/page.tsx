"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { WithRole } from "../components/common-comp/withRole";
import Spinner from "../dashboard/loading";
import { Pagination } from "@nextui-org/react";
import { ClientsTable } from "../components/clients/table";

// import Pagination from "../components/common-comp/pagination";

export default function Clients() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [clientsRowData, setClientsRowData] = useState<any[]>([]);
  const [reloadTable, setReloadTable] = useState(false);

  const [totalClientsCount, setTotalClientsCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleReloadTable = () => {
    setReloadTable((prv: boolean) => !prv);
  };

  useEffect(() => {
    // declare the data fetching function
    // const fetchData = async () => {
    //   const columns = JSON.stringify({ staffid: true });
    //   const staff_details = await fetch("api/staff?page-number=" + currentPage);
    //   const res = await staff_details.json();
    //   setStaffRowData(res.staff);
    //   const tmpCount = Math.ceil(res.staffCount / 10);
    //   setTotalStaffCount(tmpCount);
    // };

    // fetchData().catch(console.error);
  }, [reloadTable, currentPage]);
  if (status === "loading") {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (!session) {
    router.push("/");
    return null;
  }
  return (
    <WithRole roles={["Admin", "Manager", "systemadmin"]}>
      <div>
        <Navbar />
        <div className="flex items-center justify-center p-4">
          <span className="text-2xl font-semibold leading-none text-gray-900 select-none pt-2 mr-auto">
            <span className="text-indigo-600">Clients</span>
          </span>
          {/* <StaffAddNew
            buttonName="Add New"
            setReloadTable={toggleReloadTable}
          /> */}
        </div>
        <div>
          {clientsRowData && (
            <ClientsTable
              clientsRowData={clientsRowData}
              setReloadTable={toggleReloadTable}
            />
          )}
        </div>
        <div className="md:px-2 mt-3 flex item-center justify-center">
          <Pagination
            isCompact
            showControls
            total={totalClientsCount}
            page={currentPage}
            onChange={setCurrentPage}
          />
        </div>
      </div>
    </WithRole>
  );
}
