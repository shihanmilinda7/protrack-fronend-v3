"use client";

import { Card, CardBody } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getDateDifference } from "./utils";
import LineChart from "./line-chart";

const ChartProjectTask = ({ taskDetailsIn }: { taskDetailsIn?: any }) => {
  const [taskDetails, setTaskDetails] = useState<any>({});
  // const [dateDifferance, setDateDifferance] = useState<any>("");
  const [idealLineArray, setIdealLineArray] = useState<any>([]);

  useEffect(() => {
    const q = { ...taskDetailsIn };
    setTaskDetails(q);
    const dateGap = getDateDifference(q.enddate, q.startdate);
    // setDateDifferance(dateGap);

    const tmpCount = q.taskitems[0]?.estimatecount / dateGap;
    let i = 0;
    let sum = 0;
    const resultArray: number[] = [];

    while (i < dateGap) {
      const tmpSum = sum + tmpCount;
      const roundedNumber = parseFloat(tmpSum.toFixed(2));
      resultArray.push(roundedNumber);
      sum += tmpCount;
      i += 1;
    }
    setIdealLineArray(resultArray);
  }, [taskDetailsIn]);

  return (
    <div className="min-w-[35vw] max-w-[35vw]">
      <Card>
        <CardBody>
          <h1 className="text-xl text-blue-800 font-semibold">
            {taskDetails.taskname}
            {/* <h2>{JSON.stringify(idealLineArray)}</h2> */}
            {/* <h2>{JSON.stringify(taskDetails.taskitems)}</h2> */}
          </h1>
          {/* <h1 className="text-base text-blue-800">{dateDifferance}</h1> */}
          {/* <h1 className="text-xl text-blue-800 font-semibold">
            {JSON.stringify(taskDetails)}
          </h1> */}
          {taskDetails?.taskitems?.length == 0 ? (
            <h2 className="text-blue-800">No task items</h2>
          ) : (
            <LineChart idealLineArrayIn={idealLineArray} />
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default ChartProjectTask;
