import dayjs from "dayjs";
import { Value } from "../@types/chart";
import { formatChartValue } from "./formatChartValue";

export const createRestDummyData = (
  arr: Value[],
  createLength: number
): Value[] => {
  const newArray: Value[] = [];

  // const lastDate = new Date(arr[arr.length - 1].date);

  const lastDate = dayjs(arr[arr.length - 1].date);

  const sumValue = arr.reduce((acc, cur) => {
    return acc + cur.end;
  }, 0);

  const avgValue = formatChartValue(sumValue / arr.length);

  for (let i = 1; i <= createLength; i++) {
    newArray.push({
      end: avgValue,
      high: avgValue,
      low: avgValue,
      start: avgValue,
      date: dayjs(lastDate).add(i, "day").toISOString(),
      combo: 1,
      percentage: 0,
      value_id: arr.length + i,
    });
  }

  return [...arr, ...newArray];
};
