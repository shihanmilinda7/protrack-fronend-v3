"use client";

import Modal from "react-modal";

import { useEffect, useState } from "react";
import { inputFieldValidation } from "@/app/utils/utils";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { Button, Input } from "@nextui-org/react";
import NextAutoFocusTextInputField from "../common-comp/nextui-input-fields/next-autofocus-text-input-fields";
import DatetimePicker from "../common-comp/datetimepicker";
import NextDateTimeInputField from "../common-comp/nextui-input-fields/next-datetime-input-fields";
import { format, min } from "date-fns";
import NextNumberInputField from "../common-comp/nextui-input-fields/next-number-input-fields";

const UpdateEmptyLogoutSessions = ({
  isOpenPopup,
  logintimeIn,
  logindetailidIn,
  lastLoginTime,
  toggleSave,
}: {
  isOpenPopup: any;
  logintimeIn: any;
  logindetailidIn: any;
  lastLoginTime: any;
  toggleSave: () => void;
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

  const [isOpen, setIsOpen] = useState(false);

  const { data: session, status } = useSession();
  const userid = session?.user?.userid;

  const [logintime, setLogintime] = useState("");
  const [logouttime, setLogouttime] = useState("");

  const [hours, setHours] = useState<any>(0);
  const [minutes, setMinutes] = useState<any>(0);

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
    if (logintimeIn) {
      const date = new Date(logintimeIn);
      const formattedDate = date.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setLogintime(formattedDate);
    }
  }, [logintimeIn]);

  useEffect(() => {
    setIsOpen(isOpenPopup);
  }, [isOpenPopup]);

  const sumbitDateHandler = async () => {
    const tmpLoginTime: any = new Date(logintimeIn);
    const tmpHours = hours ? hours : 0
    const tmpMin = minutes ? minutes : 0
    tmpLoginTime.setHours(tmpLoginTime.getHours() + tmpHours);
    tmpLoginTime.setMinutes(tmpLoginTime.getMinutes() + tmpMin);
    const tmpLogoutTime = format(tmpLoginTime, "yyyy-MM-dd'T'HH:mm:ss");

    const tmpLastLoginTime: any = new Date(lastLoginTime);
    const tmpLastLoginTime1 = format(tmpLastLoginTime, "yyyy-MM-dd'T'HH:mm:ss");
    setLogouttime(tmpLogoutTime);
    if (tmpLastLoginTime1 > tmpLogoutTime) {
      await sumbitDate(tmpLogoutTime);
    } else {
      toast.info("Please add valid date time!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const sumbitDate = async (datetime) => {
    try {
      if (hours != 0 || minutes != 0) {
        const response = await fetch(pathname + "/api/auth/get-empty-logout", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userid,
            datetime,
            logindetailidIn,
          }),
        });
        const jsonResponse = await response.json();
        if (jsonResponse == "SUCCESS") {
          toast.success("Successfully updated!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          toggleSave();
          setIsOpen(false);
        }
      } else {
        toast.info("Cannot be empty!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
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

  const handleFocus = (event) => {
    event.target.select();
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
            You have inactive session
            {/* You have inactive session {resultTime?.toLocaleTimeString()} */}
            {/* You have inactive session {JSON.stringify(new Date())} */}
          </h1>
          <h1 className="text-sm font-semibold text-blue-600">
            You logged in at {logintime}
          </h1>
        </div>
        <div className="flex items-center justify-center pl-4 pr-4">
          <div className="mx-auto w-full max-w-[550px]">
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 flex flex-col gap-3">
                <div className="w-full sm:w-1/1">
                  <div className="flex min-w-[450px] gap-2">
                    <Input
                      type="number"
                      variant="flat"
                      label="Hours"
                      size="sm"
                      placeholder="Type here..."
                      value={hours}
                      onChange={(e) => setHours(parseInt(e.target.value, 10))}
                      color="primary"
                      onFocus={handleFocus}
                    />
                    <Input
                      type="number"
                      variant="flat"
                      label="Minutes"
                      size="sm"
                      placeholder="Type here..."
                      value={minutes}
                      onChange={(e) => setMinutes(parseInt(e.target.value, 10))}
                      color="primary"
                      onFocus={handleFocus}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end mt-3">
              <div>
                <Button color="primary" onClick={sumbitDateHandler}>
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
export default UpdateEmptyLogoutSessions;
