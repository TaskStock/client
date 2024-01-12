import { useAppSelect } from "../store/configureStore.hooks";
import dayjs from "dayjs";
import {
  useGetValuesQuery,
  useGetValuesQueryArg,
} from "../store/modules/chart";
import { DateString } from "../@types/calendar";

const useValue = () => {
  const getDates = () => {
    const startDate = dayjs()
      .local()
      .subtract(29, "day")
      .format("YYYY-MM-DD") as DateString;
    const endDate = dayjs()
      .local()
      .add(1, "day")
      .format("YYYY-MM-DD") as DateString;
    return { startDate, endDate };
  };

  const { startDate, endDate } = getDates();

  const queryArg: useGetValuesQueryArg = {
    endDate: endDate,
    startDate: startDate,
  };

  const { data, isError, error, isLoading, refetch } =
    useGetValuesQuery(queryArg);

  return {
    data: data ? data.values : [],
    isError,
    error,
    isLoading,
    refetch,
    getValuesQueryArgs: queryArg,
  };
};

export default useValue;
