import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { IsoString } from "../@types/calendar";

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

// 어제 6시부터 오늘 6시 사이의 시간인지 확인. todo값을 변경했을시.
function checkIsLocalBetween6to6(utcString: string): boolean {
  // Parse UTC string into dayjs object
  const dt = dayjs.utc(utcString);

  const localDateStart = dayjs()
    .set("hour", 6)
    .set("minute", 0)
    .set("second", 0)
    .set("millisecond", 0)
    .subtract(1, "day");

  const localDateEnd = localDateStart.add(1, "day");

  return dt.isAfter(localDateStart) && dt.isBefore(localDateEnd);
}

// todo에 해당하는 value 찾기 용.
function checkIsWithInOneDay(value_date: string, todo_date: string) {
  const dateA = dayjs.utc(value_date);
  const dateB = dayjs.utc(todo_date);

  // Calculate the difference in hours between inputA and inputB
  // const hoursDifference = Math.abs(dateA.diff(dateB, "hour"));

  const hoursDifference = dateB.diff(dateA, "hour");

  console.log(hoursDifference);

  // Check if the difference is within 24 hours
  return hoursDifference <= 24;
}

export { checkIsSameLocalDay, checkIsWithInOneDay, checkIsLocalBetween6to6 };
