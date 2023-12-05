"use client";

import { Button, Card, CardBody } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { createIdealLineArray, dateArray, getDateDifference } from "./utils";
import LineChart from "./line-chart";
import { MdGridView } from "react-icons/md";
import ChartPopup from "./chart-popup";

const ChartProjectTask = ({ taskDetailsIn }: { taskDetailsIn?: any }) => {
  const [taskDetails, setTaskDetails] = useState<any>({});
  const [taskStartdate, setTaskStartdate] = useState<any>("");
  const [taskitemid, setTaskitemid] = useState<any>("");
  const [taskid, setTaskid] = useState<any>("");
  const [taskitemname, setTaskitemname] = useState<any>("");
  const [isMultyTaskItems, setIsMultyTaskItems] = useState<any>(false);

  const [idealLineArray, setIdealLineArray] = useState<any>([]);
  const [currentLineArray, setCurrentLineArray] = useState<any>([]);
  const [requiredLineArray, setRequiredLineArray] = useState<any>([]);

  useEffect(() => {
    const q = { ...taskDetailsIn };
    setTaskDetails(q);
    const dateGap =
      getDateDifference(q.enddate, q.startdate) == 0
        ? 1
        : getDateDifference(q.enddate, q.startdate);
    setTaskStartdate(q.startdate);
    setTaskid(q.taskid);
    let incrementCount: any = 0;
    if (q.taskitems.length > 0) {
      setTaskitemid(q.taskitems[0]?.taskitemid);
      setTaskitemname(q.taskitems[0]?.description);
      incrementCount = q.taskitems[0]?.estimatecount / dateGap;

      const resultArray = createIdealLineArray(0, dateGap, incrementCount);
      setIdealLineArray(resultArray);
      if (q.taskitems.length > 1) {
        setIsMultyTaskItems(true);
      }
    } else {
      const resultArray = createIdealLineArray(0, dateGap, 8);
      setIdealLineArray(resultArray);
    }
  }, [taskDetailsIn]);

  useEffect(() => {
    if (taskitemid) {
      getTimelogDataAsItemid();
    } else {
      if (taskid) {
        getTimelogDataAsTask();
      }
    }
  }, [taskitemid, taskid]);

  useEffect(() => {
    // console.log("sasdasd", idealLineArray.length >= currentLineArray.length);
    if (idealLineArray.length >= currentLineArray.length) {
      if (
        idealLineArray[idealLineArray.length - 1] >=
          currentLineArray[currentLineArray.length - 1] ||
        currentLineArray.length == 0
      ) {
        const tmpDateGap = idealLineArray.length - currentLineArray.length;
        const tmpIncrementCount =
          (idealLineArray[idealLineArray.length - 1] -
            currentLineArray[currentLineArray.length - 1]) /
          tmpDateGap;
        console.log(
          "currentLineArray[currentLineArray.length - 1]",
          currentLineArray[currentLineArray.length - 1]
        );
        const resultArray = createIdealLineArray(
          currentLineArray[currentLineArray.length - 1],
          tmpDateGap,
          tmpIncrementCount
        );
        const tmpArray = [...currentLineArray, ...resultArray];
        // setIdealLineArray(resultArray);
        setRequiredLineArray(tmpArray);
      } else {
        setRequiredLineArray([]);
      }
    } else {
      setRequiredLineArray([]);
    }
  }, [idealLineArray, currentLineArray]);
  //
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
      setCurrentLineArray(cumulativeArray);
    };

    fetchData().catch(console.error);
  };

  const getTimelogDataAsTask = async () => {
    const fetchData = async () => {
      const details = await fetch(
        "api/timelogs/get-timelog-as-task?taskid=" + taskid
      );
      const res = await details.json();
      const maxDate = res.timelogData.reduce((max, log) => {
        const currentDate = new Date(log.date);
        return currentDate > max ? currentDate : max;
      }, new Date(0));

      const datesArray = dateArray(taskStartdate, maxDate);
      const resultArray = datesArray.map((date) => {
        const matchingObject = res.timelogData.find((obj) => obj.date === date);

        const time = matchingObject ? matchingObject.time : 0;

        return { date, time };
      });
      let cumulativeTime = 0;
      const cumulativeArray = resultArray.map((item) => {
        cumulativeTime += item.time;
        return cumulativeTime;
      });
      setCurrentLineArray(cumulativeArray);
    };

    fetchData().catch(console.error);
  };
  return (
    <div className="sm:min-w-[35vw] sm:max-w-[35vw] w-[100vw]">
      <Card>
        <CardBody>
          <div className="flex justify-between">
            <h1 className="text-xl text-blue-800 font-semibold">
              {taskDetails.taskname}
              {/* --
              {JSON.stringify(idealLineArray)}
              --
              {JSON.stringify(currentLineArray)}--
              {JSON.stringify(requiredLineArray)} */}
            </h1>
            {isMultyTaskItems ? (
              <ChartPopup taskDetailsIn={taskDetails} />
            ) : // <Button color="primary" isIconOnly>
            //   <MdGridView className="h-4 w-4" />
            // </Button>
            null}
          </div>
          {taskDetails?.taskitems?.length == 0 ? (
            <div>
              {/* <a>{JSON.stringify(currentLineArray)}</a> */}
              <LineChart
                idealLineArrayIn={idealLineArray}
                currentLineArrayIn={currentLineArray}
                requiredLineArrayIn={requiredLineArray}
                xaxis="Day count"
                yaxis="Hours"
              />
            </div>
          ) : (
            <div>
              <LineChart
                idealLineArrayIn={idealLineArray}
                currentLineArrayIn={currentLineArray}
                requiredLineArrayIn={requiredLineArray}
                titleIn={taskitemname}
                xaxis="Day count"
                yaxis="Estimate count"
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
