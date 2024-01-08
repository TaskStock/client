import dayjs from "dayjs";

export const calculateDatesOfMonth = (currentDateString: string) => {
  const currentDate = dayjs(currentDateString);

  const startOfMonth = currentDate.startOf("month");
  const startDay = startOfMonth.startOf("week");

  const endOfMonth = currentDate.endOf("month");
  const endDay = endOfMonth.endOf("week");

  const calendar: dayjs.Dayjs[] = [];

  let day = startDay;
  while (day.isBefore(endDay)) {
    calendar.push(day);
    day = day.add(1, "day");
  }

  return calendar;
};
