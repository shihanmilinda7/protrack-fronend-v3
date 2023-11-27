export const getDateDifference = (tmpenddate, tmpstartdate) => {
  const date1: any = new Date(tmpenddate);
  const date2: any = new Date(tmpstartdate);
  const differenceMilliseconds: any = date1 - date2;

  const differenceInDays = Math.abs(
    differenceMilliseconds / (1000 * 60 * 60 * 24)
  );
  return differenceInDays;
};
