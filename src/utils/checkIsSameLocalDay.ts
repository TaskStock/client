import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

// Extend dayjs with utc plugin
dayjs.extend(utc);

function checkIsSameLocalDay(utcString1: string, utcString2: string): boolean {
  // Parse UTC strings into dayjs objects
  const dt1 = dayjs.utc(utcString1);
  const dt2 = dayjs.utc(utcString2);

  // Convert UTC datetime objects to local datetime objects
  const localDt1 = dt1.local();
  const localDt2 = dt2.local();

  return localDt1.isSame(localDt2, "day");
}

function checkIsLocalToday(utcString: string): boolean {
  // Parse UTC string into dayjs object
  const dt = dayjs.utc(utcString);

  // Convert UTC datetime object to local datetime object
  const localDt = dt.local();

  return localDt.isSame(dayjs().local(), "day");
}

export { checkIsSameLocalDay, checkIsLocalToday };
