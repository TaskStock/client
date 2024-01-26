import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

// Extend dayjs with utc plugin
dayjs.extend(utc);

// 두 utc string이 같은 날인지 확인.
function checkIsSameLocalDay(utcString1: string, utcString2: string): boolean {
  // Parse UTC strings into dayjs objects
  const dt1 = dayjs(utcString1);
  const dt2 = dayjs(utcString2);

  return dt1.isSame(dt2, "day");
}

// 즉 정산날짜에 해당하는 utc인지를 확인.

// 이제는 들어오면, 그게 오늘 날짜의 0시부터, 23시59분59초까지의 utc인지를 확인해야함.
function checkIsWithInCurrentCalcDay(utcString: string): boolean {
  // Parse UTC string into dayjs object
  const dt = dayjs(utcString);

  let calcDateStart = dayjs()
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0)
    .set("millisecond", 0);
  let calcDateEnd = dayjs()
    .set("hour", 23)
    .set("minute", 59)
    .set("second", 59)
    .set("millisecond", 999);

  return dt.isAfter(calcDateStart) && dt.isBefore(calcDateEnd);

  // let calcDateStart;

  // if (
  //   dayjs().isBefore(
  //     dayjs()
  //       .set("hour", 6)
  //       .set("minute", 0)
  //       .set("second", 0)
  //       .set("millisecond", 0)
  //   )
  // ) {
  //   calcDateStart = dayjs()
  //     .set("hour", 6)
  //     .set("minute", 0)
  //     .set("second", 0)
  //     .set("millisecond", 0)
  //     .subtract(1, "day")
  //     .subtract(1, "millisecond");

  //   const calcDateEnd = calcDateStart.add(1, "day");

  //   return dt.isAfter(calcDateStart) && dt.isBefore(calcDateEnd);
  // } else {
  //   calcDateStart = dayjs()
  //     .set("hour", 6)
  //     .set("minute", 0)
  //     .set("second", 0)
  //     .set("millisecond", 0)
  //     .subtract(1, "millisecond");

  //   const calcDateEnd = calcDateStart.add(1, "day");

  //   return dt.isAfter(calcDateStart) && dt.isBefore(calcDateEnd);
  // }
}

// todo에 해당하는 value 찾기 용.
// 1월 23일 변경으로 이제, value_date는 정산시간으로 들어옴.
// todo_date는 todo 생성시간으로 들어옴.
function checkIsWithInOneDay(value_date: string, todo_date: string) {
  const dateA = dayjs.utc(value_date);
  const dateB = dayjs.utc(todo_date);

  // Calculate the difference in hours between inputA and inputB
  // const hoursDifference = Math.abs(dateA.diff(dateB, "hour"));

  const hoursDifference = dateA.diff(dateB, "hour");

  // Check if the difference is within 24 hours
  return hoursDifference <= 24 && hoursDifference >= 0;
}

export {
  checkIsSameLocalDay,
  checkIsWithInOneDay,
  checkIsWithInCurrentCalcDay,
};
