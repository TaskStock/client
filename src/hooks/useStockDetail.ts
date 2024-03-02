import { StockDetail } from "../@types/stock";
import { useGetStockDetailsQuery } from "../store/modules/market/market";

export const useStockDetail = (stockId: number) => {
  const { data, isLoading, isError, refetch } = useGetStockDetailsQuery({
    id: stockId,
  });

  const info = data?.stockitem;
  const stat = data?.statistics;
  const userList = data?.userlist;

  let mySuccessRate = info
    ? isNaN(Math.round((info.my_success_count / info.my_take_count) * 100))
      ? 0
      : Math.round((info.my_success_count / info.my_take_count) * 100)
    : 0;

  let totalSuccessRate = stat
    ? isNaN(Math.round((stat.total_success_count / stat.total_count) * 100))
      ? 0
      : Math.round((stat.total_success_count / stat.total_count) * 100)
    : 0;

  let diffRate = mySuccessRate - totalSuccessRate;

  const { average, maxWeekday, maxValue } = stat
    ? calculateStatisticsAverageAndMax(stat)
    : { average: 0, maxWeekday: [], maxValue: 0 };

  return {
    info,
    stat,
    userList,
    isLoading,
    isError,
    average,
    maxWeekday,
    maxValue,
    diffRate,
    mySuccessRate,
    totalSuccessRate,
    refetch,
  };
};

function calculateStatisticsAverageAndMax(stat: StockDetail["statistics"]): {
  average: number;
  maxSuccessWeekDay: string[];
  maxWeekday: string[];
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
  let maxSuccessWeekDay: string[] = [];
  let maxWeekday: string[] = [];
  let maxValue = -1;

  maxSuccessWeekDay = calculateMaxWeekday(stat, [
    "s_monday",
    "s_tuesday",
    "s_wednesday",
    "s_thursday",
    "s_friday",
    "s_saturday",
    "s_sunday",
  ]);

  maxWeekday = calculateMaxWeekday(stat, [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ]);

  console.log("maxWeekday", maxWeekday);

  return { average, maxSuccessWeekDay, maxWeekday, maxValue };
}

function changeWeekdayToKorean(weekday: string) {
  switch (weekday) {
    case "monday":
    case "s_monday":
      return "월";
    case "tuesday":
    case "s_tuesday":
      return "화";
    case "wednesday":
    case "s_wednesday":
      return "수";
    case "thursday":
    case "s_thursday":
      return "목";
    case "friday":
    case "s_friday":
      return "금";
    case "saturday":
    case "s_saturday":
      return "토";
    case "sunday":
    case "s_sunday":
      return "일";
  }
}

function calculateMaxWeekday(stat, daysArray: string[]) {
  let maxWeekday: string[] = [];
  let maxValue = -1;

  for (const day of daysArray) {
    if (stat[day] != 0 && stat[day] >= maxValue) {
      maxValue = stat[day];
    }
  }

  for (const day of daysArray) {
    if (stat[day] === maxValue) {
      maxWeekday.push(day);
    }
  }

  maxWeekday = maxWeekday.map((item) => {
    console.log("item", item);

    return changeWeekdayToKorean(item);
  });
  return maxWeekday;
}
