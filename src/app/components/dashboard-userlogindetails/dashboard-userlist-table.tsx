"use client";

import { Listbox, ListboxItem } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ListboxWrapper } from "../common-comp/nextui-input-fields/ListboxWrapper";
import { FcApprove, FcDisapprove } from "react-icons/fc";
import { ListboxWrapperType1 } from "./ListboxWrapperType1";

export const DashboardUserListTable = ({
  userListIn,
}: {
  userListIn: any[];
}) => {
  const { data: session, status } = useSession();
  const username = session?.user?.username;

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const q = [...userListIn];
    setUserList(q);
  }, [userListIn]);

  return (
    <div className="py-2 sm:w-5/5 w-full">
      <div className="w-full">
        <ListboxWrapperType1>
          <Listbox
            aria-label="Single selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys=""
            onSelectionChange={(e) => e}
          >
            {userList?.map((y) => (
              <ListboxItem
                key={y.userid}
                value={y.userid}
                color={y.username == username ? "success" : "default"}
                className={`${
                  y.username == username
                    ? "rounded-lg text-xs font-semibold uppercase bg-slate-200 text-black"
                    : ""
                }`}
                endContent={
                  <span>
                    {y.status == "Active" ? (
                      <div className="w-6 h-6 rounded-full bg-green-500"></div>
                    ) : (
                      // <FcApprove className="h-6 w-6" />
                      <div className="w-6 h-6 rounded-full bg-red-500"></div>
                      // <FcDisapprove className="h-6 w-6" />
                    )}
                  </span>
                }
                description={
                  y.status == "Active" ? `${y.totalhours}+` : `${y.totalhours}`
                }
                showDivider={true}
              >
                {y.username == username ? "You" : y.staffname}
              </ListboxItem>
            ))}
          </Listbox>
        </ListboxWrapperType1>
      </div>
    </div>
  );
};
