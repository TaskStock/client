import dayjs from "dayjs";
import { useAppSelect } from "../store/configureStore.hooks";
import { useGetAllTodosQuery } from "../store/modules/todo/todo";
import { DateStringYYYYMM } from "../@types/calendar";

const useTodos = () => {
  const { currentDateString, currentDateYYYYMMDD: currentDateFormat } =
    useAppSelect((state) => state.calendar);
  const { data, isLoading, isError, error, refetch } = useGetAllTodosQuery({
    date: currentDateFormat,
  });

  return {
    data: data ? [...data.todos] : [],
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useTodos;
