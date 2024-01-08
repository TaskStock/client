import { Value } from "../@types/chart";
import { formatChartValue } from "./formatChartValue";

export const createMockData = (length: number): Value[] => {
  const data_12: Value[] = [];
  let initialValue = 10;

  for (let i = 1; i <= length; i++) {
    const date = new Date(2016, 5, i); // Months start from 0, so June is 5

    // Simulate stock-like movement with slight variations
    const fluctuation = Math.random() * 3 - 1.5; // Random variation between -1.5 and 1.5
    const start = initialValue + fluctuation;
    const end = start + Math.random() * 2 - 1; // Random small change
    const high = Math.max(start, end) + Math.random() * 2;
    const low = Math.min(start, end) - Math.random() * 2;

    // Prepare new data point
    const newDataPoint: Value = {
      date: date.toISOString(), // Date
      start: formatChartValue(start), // Limit decimals to 2 places
      end: formatChartValue(end),
      high: formatChartValue(high),
      low: formatChartValue(low),
      value_id: i,
      combo: 1,
      percentage: 0,
    };

    // Update initial value for the next day based on the previous day's end
    initialValue = newDataPoint.end;

    // Add new data point to the data array
    data_12.push(newDataPoint);
  }

  return data_12;
};
