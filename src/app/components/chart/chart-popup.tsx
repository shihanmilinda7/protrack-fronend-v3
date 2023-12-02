"use client";

import Modal from "react-modal";

import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { MdGridView } from "react-icons/md";

const ChartPopup = ({ taskDetailsIn }: { taskDetailsIn: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskDetails, setTaskDetails] = useState<any>({});

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
    const q = { ...taskDetailsIn };
    setTaskDetails(q);
  }, [taskDetailsIn]);

  return (
    <div>
      <Button color="primary" isIconOnly onClick={() => setIsOpen(true)}>
        <MdGridView className="h-4 w-4" />
      </Button>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          style={customStyles}
          ariaHideApp={false}
        >
          <div className="pb-1">
            <h1 className="text-2xl text-blue-800">Coming soon...</h1>
          </div>
          <div className="flex items-center justify-center">
            <div className="mx-auto w-full min-w-[550px] p-6 max-h-[600px] overflow-y-auto">
              <div className="flex flex-wrap"></div>
              <div className="mt-2">Coming soon...</div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
export default ChartPopup;
