import dayjs from "dayjs";

export const initializeCalendarItems = (
  datesOfMonth: dayjs.Dayjs[],
  currentDateString: string
) => {
  return datesOfMonth.map((date) => {
    const isThisMonth =
      dayjs(date).format("YYYY-MM") ===
      dayjs(currentDateString).format("YYYY-MM");

    const isSelected = date.isSame(currentDateString, "date");

    const isToday =
      dayjs(date).format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD");

    return {
      date,
      todoCount: 0,
      isSelected: isSelected,
      isThisMonth: isThisMonth,
      isToday: isToday,
    };
  });
};
