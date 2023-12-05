export const getDateDifference = (tmpenddate, tmpstartdate) => {
  const date1: any = new Date(tmpenddate);
  const date2: any = new Date(tmpstartdate);
  const differenceMilliseconds: any = date1 - date2;

  const differenceInDays = Math.abs(
    differenceMilliseconds / (1000 * 60 * 60 * 24)
  );
  return differenceInDays;
};

export const createIdealLineArray = (sum=0, dateGap, increment) => {
  let i = 0;
  // sum = 0;
  const resultArray: number[] = [];

  while (i < dateGap) {
    const tmpSum = sum + increment;
    const roundedNumber = parseFloat(tmpSum.toFixed(2));
    resultArray.push(roundedNumber);
    sum += increment;
    i += 1;
  }

  return resultArray;
};

export const dateArray = (startDate, endDate) => {
  const tmpStartDate: any = new Date(startDate);

  const daysToForward =
    Math.floor((endDate - tmpStartDate) / (24 * 60 * 60 * 1000)) + 1;

  const dateArray: any = Array.from({ length: daysToForward }, (_, index) => {
    const result = new Date(startDate);
    result.setDate(result.getDate() + index);
    return result;
  });

  const formattedDateArray = dateArray.map(
    (date) => date.toISOString().split("T")[0]
  );

  return formattedDateArray;
};
