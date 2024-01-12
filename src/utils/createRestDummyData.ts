import dayjs from "dayjs";
import { Value, WagmiData } from "../@types/chart";
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

export const convertAndCreateWagmiData = (
  arr: Value[],
  createLength: number
): WagmiData[] => {
  const convertedData = arr.map((item) => {
    return {
      timestamp: dayjs(item.date).unix(),
      open: item.start,
      high: item.high,
      low: item.low,
      close: item.end,
    };
  });

  const newArray: WagmiData[] = [...convertedData];

  if (newArray.length == 0) {
    return newArray;
  }

  const lastDate = dayjs(arr[arr.length - 1].date);

  const sumValue = arr.reduce((acc, cur) => {
    return acc + cur.end;
  }, 0);

  const avgValue = sumValue / arr.length;

  for (let i = 1; i <= createLength; i++) {
    const newDate = dayjs(lastDate).add(i, "day").toISOString();
    newArray.push({
      timestamp: dayjs(newDate).unix(),
      open: avgValue,
      close: avgValue,
      low: avgValue,
      high: avgValue,
    });
  }

  return newArray;
};
