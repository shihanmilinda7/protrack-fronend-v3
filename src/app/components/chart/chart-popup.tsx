"use client";

import Modal from "react-modal";

import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { MdGridView } from "react-icons/md";
import Head from "next/head";
import { createIdealLineArray, dateArray, getDateDifference } from "./utils";
import LineChart from "./line-chart";
import { AiOutlineCloseCircle } from "react-icons/ai";

const ChartPopup = ({ taskDetailsIn }: { taskDetailsIn: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskDetails, setTaskDetails] = useState<any>({});
  const [taskStartdate, setTaskStartdate] = useState<any>("");
  const [taskitemArray, setTaskitemArray] = useState<any>([]);
  const [taskitemArrayUpdate, setTaskitemArrayUpdate] = useState(1);

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
      //   width: "95%", // Set default width to full on small screens
      maxWidth: "1350px", // Set max-width for larger screens
      maxHeight: "650px", // Set max-width for larger screens
      transition: "width 0.3s", // Add transition for smooth resizing
    },
  };

  const mediaQuery = `@media (min-width: 768px) {
    .ReactModal__Content {
      width: 1300px !important; // Override width for larger screens
    }
  }`;

  useEffect(() => {
    const q = { ...taskDetailsIn };
    setTaskDetails(q);
    const dateGap =
      getDateDifference(q.enddate, q.startdate) == 0
        ? 1
        : getDateDifference(q.enddate, q.startdate);
    setTaskStartdate(q.startdate);

    const tmpItemArray = [];
    let incrementCount: any = 0;

    for (let i = 0; i < q.taskitems.length; i++) {
      const item = q.taskitems[i];
      incrementCount = q.taskitems[i]?.estimatecount / dateGap;
      const resultArray = createIdealLineArray(dateGap, incrementCount);
      item["idealLineArray"] = resultArray;
      tmpItemArray.push(item);
    }
    setTaskitemArray(tmpItemArray);
    setTaskitemArrayUpdate((prv: any) => prv + 1);
  }, [taskDetailsIn]);

  useEffect(() => {
    if (taskitemArray.length > 0) {
      for (let i = 0; i < taskitemArray.length; i++) {
        const element = taskitemArray[i]; //taskitemid
        getTimelogDataAsItemid(element.taskitemid);
      }
    }
  }, [taskitemArrayUpdate]);

  const getTimelogDataAsItemid = async (tmpTaskitemid) => {
    const fetchData = async () => {
      const details = await fetch(
        "api/timelogs/get-timelogdata-as-item?itemid=" + tmpTaskitemid
      );
      const res = await details.json();
      const maxDate = res.timelogData.reduce((max, log) => {
        const currentDate = new Date(log.date);
        return currentDate > max ? currentDate : max;
      }, new Date(0));

      const datesArray = dateArray(taskStartdate, maxDate);
      const resultArray = datesArray.map((date) => {
        const matchingObject = res.timelogData.find((obj) => obj.date === date);

        const count = matchingObject ? matchingObject.count : 0;

        return { date, count };
      });
      let cumulativeCount = 0;
      const cumulativeArray = resultArray.map((item) => {
        cumulativeCount += item.count;
        return cumulativeCount;
      });

      let tmpItem = taskitemArray.find((i) => i.taskitemid == tmpTaskitemid);
      if (tmpItem) {
        tmpItem["currentLineArray"] = cumulativeArray;
      }
    };

    fetchData().catch(console.error);
  };
  return (
    <div>
      <Button color="primary" isIconOnly onClick={() => setIsOpen(true)}>
        <MdGridView className="h-4 w-4" />
      </Button>
      {isOpen && (
        <>
          <Head>
            <style>{mediaQuery}</style>
          </Head>
          <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            style={customStyles}
            ariaHideApp={false}
          >
            <div className="w-full flex flex-col">
              <div className="flex items-center justify-center">
                <span className="text-2xl font-semibold leading-none text-gray-900 select-none pt-2 mr-auto">
                  <span className="text-indigo-600">
                    {taskDetails.taskname}
                  </span>
                </span>
                <AiOutlineCloseCircle
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 text-indigo-700 hover:text-indigo-500 cursor-pointer flex justify-end"
                />
              </div>
              <div className="flex items-center justify-center">
                <div className="mx-auto">
                  <div className="flex flex-wrap">
                    {taskitemArray.map((ti) => (
                      <LineChart
                        idealLineArrayIn={ti.idealLineArray}
                        currentLineArrayIn={ti.currentLineArray}
                        titleIn={ti.description}
                        xaxis="Day count"
                        yaxis="Estimate count"
                      />
                    ))}
                  </div>
                  {/* <div className="mt-2">{JSON.stringify(taskitemArray)}</div> */}
                </div>
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};
export default ChartPopup;
