import dayjs from "dayjs";

export type IsoString =
  `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`;

export type DateString = `${number}-${number}-${number}`;

export type DateStringYYYYMM = `${number}-${number}`;

export interface CalendarItem {
  date: dayjs.Dayjs;
  todoCount: number;
  isSelected: boolean;
  isThisMonth: boolean;
  isToday: boolean;
}
