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

function checkIsLocalBetween6to6(utcString: string): boolean {
  // Parse UTC string into dayjs object
  const dt = dayjs.utc(utcString);

  const localDateStart = dayjs()
    .local()
    .set("hour", 6)
    .set("minute", 0)
    .set("second", 0)
    .set("millisecond", 0);

  const localDateEnd = localDateStart.add(1, "day");

  return dt.isAfter(localDateStart) && dt.isBefore(localDateEnd);
}

function checkIsSameLocalDayValueTodo(
  valueDate: string,
  todoDate: string
): boolean {
  // Parse UTC strings into dayjs objects
  const dt1 = dayjs.utc(valueDate).add(1, "day");
  const dt2 = dayjs.utc(todoDate);

  // Convert UTC datetime objects to local datetime objects
  const localDt1 = dt1.local();
  const localDt2 = dt2.local();

  return localDt1.isSame(localDt2, "day");
}

function checkIsWithInOneDay(value_date: string, todo_date: string) {
  const dateA = dayjs.utc(value_date);
  const dateB = dayjs.utc(todo_date);

  // Calculate the difference in hours between inputA and inputB
  const hoursDifference = Math.abs(dateA.diff(dateB, "hour"));

  // Check if the difference is within 24 hours
  return hoursDifference <= 24;
}

// 오늘 날짜가 아니라, 정산 날짜여야 함.

export {
  checkIsSameLocalDay,
  checkIsSameLocalDayValueTodo,
  checkIsWithInOneDay,
  checkIsLocalBetween6to6,
};
