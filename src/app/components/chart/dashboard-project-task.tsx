"use client";

import { Button, Card, CardBody } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getDateDifference } from "./utils";
import LineChart from "./line-chart";
import { MdGridView } from "react-icons/md";

const ChartProjectTask = ({ taskDetailsIn }: { taskDetailsIn?: any }) => {
  const [taskDetails, setTaskDetails] = useState<any>({});
  const [taskStartdate, setTaskStartdate] = useState<any>("");
  const [taskitemid, setTaskitemid] = useState<any>("");
  const [isMultyTaskItems, setIsMultyTaskItems] = useState<any>(false);
  // const [dateDifferance, setDateDifferance] = useState<any>("");
  const [idealLineArray, setIdealLineArray] = useState<any>([]);
  const [currentLineArray, setCurrentLineArray] = useState<any>([]);

  useEffect(() => {
    const q = { ...taskDetailsIn };
    setTaskDetails(q);
    const dateGap =
      getDateDifference(q.enddate, q.startdate) == 0
        ? 1
        : getDateDifference(q.enddate, q.startdate);
    setTaskStartdate(q.startdate);
    // setDateDifferance(dateGap);
    setTaskitemid(q.taskitems[0]?.taskitemid);
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
    if (q.taskitems.length > 1) {
      setIsMultyTaskItems(true);
    }
    // console.log("resultArray", q.taskitems[0]?.taskitemid, dateGap);
    // console.log("dateArray(", dateArray());
  }, [taskDetailsIn]);

  useEffect(() => {
    if (taskitemid) {
      getTimelogDataAsItemid();
    }
  }, [taskitemid]);

  const dateArray = (startDate, endDate) => {
    // Start and end dates
    const tmpStartDate: any = new Date(startDate);
    // const endDate = new Date("2023-10-22"); // Adjust the end date as needed

    // Calculate the number of days between start and end dates
    const daysToForward =
      Math.floor((endDate - tmpStartDate) / (24 * 60 * 60 * 1000)) + 1;

    // Create an array of dates
    const dateArray: any = Array.from({ length: daysToForward }, (_, index) => {
      const result = new Date(startDate);
      result.setDate(result.getDate() + index);
      return result; // Add this line to return the date
    });

    const formattedDateArray = dateArray.map(
      (date) => date.toISOString().split("T")[0]
    );

    return formattedDateArray;
  };

  const getTimelogDataAsItemid = async () => {
    const fetchData = async () => {
      const details = await fetch(
        "api/timelogs/get-timelogdata-as-item?itemid=" + taskitemid
      );
      const res = await details.json();
      const maxDate = res.timelogData.reduce((max, log) => {
        const currentDate = new Date(log.date);
        return currentDate > max ? currentDate : max;
      }, new Date(0));

      const datesArray = dateArray(taskStartdate, maxDate);
      // console.log("res", res.timelogData);
      const resultArray = datesArray.map((date) => {
        // Find the object with a matching date in dataObjectsArray
        const matchingObject = res.timelogData.find((obj) => obj.date === date);

        // If a match is found, extract the count; otherwise, set count to 0
        const count = matchingObject ? matchingObject.count : 0;

        // Return an object with the date and count
        return { date, count };
      });
      let cumulativeCount = 0;
      const cumulativeArray = resultArray.map((item) => {
        cumulativeCount += item.count;
        return cumulativeCount;
      });
      setCurrentLineArray(cumulativeArray);
      // console.log("resultArray", cumulativeArray);
    };

    // call the function
    fetchData().catch(console.error);
  };
  return (
    <div className="sm:min-w-[35vw] sm:max-w-[35vw] w-[100vw]">
      <Card>
        <CardBody>
          <div className="flex justify-between">
            <h1 className="text-xl text-blue-800 font-semibold">
              {taskDetails.taskname}
              {/* <h2>{JSON.stringify(idealLineArray)}</h2> */}
              {/* <h2>{JSON.stringify(currentLineArray)}</h2> */}
            </h1>
            {isMultyTaskItems ? (
              <Button color="primary" isIconOnly>
                <MdGridView className="h-4 w-4" />
              </Button>
            ) : null}
          </div>
          {/* <h1 className="text-base text-blue-800">{dateDifferance}</h1> */}
          {/* <h1 className="text-xl text-blue-800 font-semibold">
            {JSON.stringify(taskDetails)}
          </h1> */}
          {taskDetails?.taskitems?.length == 0 ? (
            <h2 className="text-blue-800">Coming soon...</h2>
          ) : (
            <div>
              <LineChart
                idealLineArrayIn={idealLineArray}
                currentLineArrayIn={currentLineArray}
              />
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default ChartProjectTask;
//SELECT t.*,td.*,sum(td.count) as totalcount FROM timelogs as t JOIN timelogsdetails as td ON t.timelogid = td.timelogid GROUP BY date, taskitemid
