import dayjs from "dayjs";

export const calculateDatesOfMonth = (currentDateString: string) => {
  const currentDate = dayjs(currentDateString);
  const startOfMonth = currentDate.startOf("month");
  const startDay = startOfMonth.startOf("week");
  const endOfMonth = currentDate.endOf("month");
  const endDay = endOfMonth.endOf("week");

  const startDayTimeTuned = startDay
    .set("hour", currentDate.hour())
    .set("minute", currentDate.minute())
    .set("second", currentDate.second())
    .set("millisecond", currentDate.millisecond());

  const calendar: dayjs.Dayjs[] = [];

  let day = startDayTimeTuned;
  while (day.isBefore(endDay)) {
    calendar.push(day);
    day = day.add(1, "day");
  }

  return calendar;
};
