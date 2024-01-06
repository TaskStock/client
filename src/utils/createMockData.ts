import { Value } from "../@types/chart";

export const createMockData = (length: number): Value[] => {
  const data_12: Value[] = [];
  let initialValue = 10;

  for (let i = 1; i <= length; i++) {
    const date = new Date(2016, 5, i); // Months start from 0, so June is 5

    // Simulate stock-like movement with slight variations
    const fluctuation = Math.random() * 3 - 1.5; // Random variation between -1.5 and 1.5
    const open = initialValue + fluctuation;
    const close = open + Math.random() * 2 - 1; // Random small change
    const high = Math.max(open, close) + Math.random() * 2;
    const low = Math.min(open, close) - Math.random() * 2;

    // Prepare new data point
    const newDataPoint = {
      x: date, // Date
      open: open.toFixed(2), // Limit decimals to 2 places
      close: close.toFixed(2),
      high: high.toFixed(2),
      low: low.toFixed(2),
    };

    // Update initial value for the next day based on the previous day's close
    initialValue = parseFloat(newDataPoint.close);

    // Add new data point to the data array
    data_12.push(newDataPoint);
  }

  return data_12;
};
