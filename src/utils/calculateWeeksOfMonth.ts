import dayjs from "dayjs";

export const calculateWeeksOfMonth = (currentDateString: string) => {
  const now = dayjs(currentDateString);

  const startOfMonth = now.startOf("month");
  const startDay = startOfMonth.startOf("week");

  const endOfMonth = now.endOf("month");
  const endDay = endOfMonth.endOf("week");

  const weekInMonth = endDay.diff(startDay, "week") + 1;

  return weekInMonth;
};
