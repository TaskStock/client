import dayjs from "dayjs";
import { DateString } from "../@types/calendar";

export const useGetValuesArg = () => {
  const startDate = dayjs()
    .local()
    .subtract(29, "day")
    .format("YYYY-MM-DD") as DateString;
  const endDate = dayjs()
    .local()
    .add(1, "day")
    .format("YYYY-MM-DD") as DateString;

  return {
    startDate,
    endDate,
  };
};
