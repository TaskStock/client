import { StockDetail } from "../@types/stock";
import { useGetStockDetailsQuery } from "../store/modules/market/market";

export const useStockDetail = (stockId: number) => {
  const { data, isLoading, isError } = useGetStockDetailsQuery({
    id: stockId,
  });

  const info = data?.stockitem;
  const stat = data?.statistics;

  let mySuccessRate = info
    ? isNaN(Math.round((info.my_success_count / info.my_take_count) * 100))
      ? 0
      : Math.round((info.my_success_count / info.my_take_count) * 100)
    : 0;

  let totalSuccessRate = info
    ? isNaN(Math.round((info.success_count / info.take_count) * 100))
      ? 0
      : Math.round((info.success_count / info.take_count) * 100)
    : 0;

  let diffRate = mySuccessRate - totalSuccessRate;

  const { average, maxWeekday, maxValue } = stat
    ? calculateStatisticsAverageAndMax(stat)
    : { average: 0, maxWeekday: "", maxValue: 0 };

  return {
    info,
    stat,
    isLoading,
    isError,
    average,
    maxWeekday,
    maxValue,
    diffRate,
    mySuccessRate,
    totalSuccessRate,
  };
};

function calculateStatisticsAverageAndMax(stat: StockDetail["statistics"]): {
  average: number;
  maxWeekday: string;
  maxValue: number;
} {
  // Calculate total sum and count from Monday to Sunday
  let sum = 0;
  let count = 0;
  for (const day of [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ]) {
    sum += stat[day];
    count++;
  }

  // Calculate average
  const average = Math.floor(sum / count);

  // Find the largest value from Monday to Friday
  let maxWeekday = "";
  let maxValue = 0;
  for (const day of [
    "s_monday",
    "s_tuesday",
    "s_wednesday",
    "s_thursday",
    "s_friday",
    "s_saturday",
    "s_sunday",
  ]) {
    if (stat[day] >= maxValue) {
      maxValue = stat[day];
      maxWeekday = day;
    }
  }

  switch (maxWeekday) {
    case "s_monday":
      maxWeekday = "월요일";
      break;
    case "s_tuesday":
      maxWeekday = "화요일";
      break;
    case "s_wednesday":
      maxWeekday = "수요일";
      break;
    case "s_thursday":
      maxWeekday = "목요일";
      break;
    case "s_friday":
      maxWeekday = "금요일";
      break;
    case "s_saturday":
      maxWeekday = "토요일";
      break;
    case "s_sunday":
      maxWeekday = "일요일";
      break;
  }

  console.log({ average, maxWeekday, maxValue });

  return { average, maxWeekday, maxValue };
}
