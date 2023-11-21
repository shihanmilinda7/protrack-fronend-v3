export const calculateTotalHours = (loginData = []) => {
  const userTotalHours: Record<number, { hours: number; minutes: number }> = {};

  loginData.forEach((session) => {
    const { userid, logintime, logouttime } = session;

    const tmploginTime: any = new Date(logintime);
    const tmplogoutTime: any = logouttime ? new Date(logouttime) : new Date();

    // console.log("tmploginTime", tmploginTime);
    // console.log("tmplogoutTime", tmplogoutTime);
    // console.log("new Date()", new Date(), tmploginTime);
    // const tmplogoutTime: any = logouttime ? new Date(logouttime) : undefined;
    // console.log(session, "tmploginTime", tmploginTime, "tmplogoutTime", tmplogoutTime);
    const sessionHours = tmplogoutTime
      ? (tmplogoutTime - tmploginTime) / (1000 * 60 * 60)
      : 0;

    // console.log("sessionHours", sessionHours);
    // console.log("userid", userid);

    if (!userTotalHours[userid]) {
      userTotalHours[userid] = { hours: 0, minutes: 0 };
    }

    userTotalHours[userid].hours += Math.floor(sessionHours);
    userTotalHours[userid].minutes += Math.floor((sessionHours % 1) * 60);
  });

  const mappedData = Object.entries(userTotalHours).map(
    ([userid, { hours, minutes }]) => {
      const totalMinutes = hours * 60 + minutes;
      const totalHours = Math.floor(totalMinutes / 60);
      const remainingMinutes = totalMinutes % 60;

      return {
        userid: parseInt(userid),
        totalhours: `${totalHours}h-${remainingMinutes}min`,
      };
    }
  );
  // console.log("mappedData", mappedData);
  return mappedData;
};

// export const calculateTotalHours = (loginData) => {
//   const userTotalHours: Record<number, { hours: number; minutes: number }> = {}; // Use a Record to specify the types

//   loginData.forEach((session) => {
//     const { userid, logintime, logouttime } = session;

//     const tmploginTime: any = new Date(logintime);
//     const tmplogoutTime: any = logouttime ? new Date(logouttime) : undefined;

//     const sessionHours = tmplogoutTime
//       ? (tmplogoutTime - tmploginTime) / (1000 * 60 * 60)
//       : 0; // Handle undefined tmplogoutTime

//     if (!userTotalHours[userid]) {
//       userTotalHours[userid] = { hours: 0, minutes: 0 };
//     }

//     userTotalHours[userid].hours += Math.floor(sessionHours);
//     userTotalHours[userid].minutes += Math.floor((sessionHours % 1) * 60);
//   });

//   const mappedData = Object.entries(userTotalHours).map(
//     ([userid, { hours, minutes }]) => ({
//       userid: parseInt(userid),
//       totalhours: `${hours}h-${minutes}min`,
//     })
//   );

//   return mappedData;
// };

// if (window.performance && window.performance.getEntriesByType) {
//   const navigationEntries =
//     window.performance.getEntriesByType("navigation");
//   if (navigationEntries.length > 0) {
//     const navigationEntry: any = navigationEntries[0];
//     if (navigationEntry.type === "navigate") {
//       console.log("Page initially loaded");
//     } else if (navigationEntry.type === "reload") {
//       console.log("Page is being reloaded");
//     }
//   } else {
//     console.log("PerformanceNavigationTiming data not available");
//   }
// } else {
//   console.log(
//     "PerformanceNavigationTiming is not supported in this browser"
//   );
// }
