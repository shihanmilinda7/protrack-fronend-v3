"use client";

import Modal from "react-modal";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Input } from "@nextui-org/react";
import { format, min } from "date-fns";
import { ListboxWrapperType2 } from "./ListboxWrapperType2";
import NextListView from "../common-comp/nextui-input-fields/next-listview";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const OrganizationSelect = ({
  isOpenPopup,
  orgList,
  email,
  password,
  runLogout = false,
}: {
  isOpenPopup: any;
  orgList: any[];
  email: any;
  password: any;
  runLogout?: boolean;
}) => {
  let pathname: string = "";

  try {
    pathname = window.location.href;
  } catch (error) {}

  if (pathname) {
    const r: number = pathname.indexOf("/", 9);
    if (r !== -1) {
      pathname = pathname.substring(0, r);
    }
  }
  const router = useRouter();

  const { data: session, status } = useSession();
  const userid = session?.user?.userid;
  const dbname1 = session?.user?.dbname;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrgKey, setSelectedOrgKey] = useState(new Set([]));
  const organizationid = React.useMemo(
    () => Array.from(selectedOrgKey).join(", "),
    [selectedOrgKey]
  );
  const [orgNameValueList, setOrgNameValueList] = useState<any[]>([]);
  const [orgMainList, setMainList] = useState<any[]>([]);
  const [selOrg, setSelOrg] = useState<any>("");
  const [exdbname, setExdbname] = useState<any>("");

  useEffect(() => {
    const tmpArray: any = [...orgList];
    setMainList(tmpArray);
    const modifiedData = tmpArray?.map((s) => ({
      name: `${s.organizationname}`,
      value: s.organizationid,
    }));
    setOrgNameValueList(modifiedData);
  }, [orgList]);

  useEffect(() => {
    const isMatching = orgMainList.find(
      (o) => o.organizationid == organizationid
    );
    if (isMatching) {
      setSelOrg(isMatching);
      // console.log("isMatching", isMatching);
    }
  }, [selectedOrgKey]);

  // useEffect(() => {
  //   setE
  // }, [session]);

  const buttonHanlder = async () => {
    if (runLogout) {
      await setNewLogout();
      await signOut();
    }
    const response = await signIn("credentials", {
      email,
      password,
      dbname: selOrg.dbname,
      organizationid: selOrg.organizationid,
      organizationname: selOrg.organizationname,
      orglist: JSON.stringify(orgMainList),
      ismultyorg: "MULTY",
      redirect: false,
    });
    if (response?.error) {
      toast.error("Username or Password Incorrect!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    toast.success("Logged in successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    window.location.href = "/dashboard";
    // router.push("/dashboard");
  };
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 50,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  useEffect(() => {
    setIsOpen(isOpenPopup);
  }, [isOpenPopup]);

  const setNewLogout = async () => {
    const response = await fetch(pathname + "/api/auth/login", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userid,
      }),
    });
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        shouldCloseOnOverlayClick={false}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="pl-4 pb-1">
          <h1 className="text-base font-semibold text-blue-800">
            Please select organization to login!
          </h1>
        </div>
        <div className="flex items-center justify-center pl-4 pr-4">
          <div className="mx-auto w-full max-w-[450px]">
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 flex flex-col gap-3">
                <div className="w-full sm:w-1/1">
                  <div className="flex min-w-[300px] gap-2">
                    <div className="w-full">
                      <ListboxWrapperType2>
                        <NextListView
                          value={selectedOrgKey}
                          onChange={setSelectedOrgKey}
                          listArray={orgNameValueList}
                        />
                      </ListboxWrapperType2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end mt-3 gap-2">
              <div className={runLogout ? "" : "hidden"}>
                <Button color="danger" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
              </div>
              <div>
                <Button color="primary" onClick={buttonHanlder}>
                  Sumbit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default OrganizationSelect;
