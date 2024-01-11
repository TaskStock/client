import dayjs from "dayjs";
import { useAppSelect } from "../store/configureStore.hooks";
import { useGetAllTodosQuery } from "../store/modules/todo/todo";
import { DateString, DateStringYYYYMM } from "../@types/calendar";
import { useGetAllTodosQueryArg } from "../store/modules/todo/queries";

const useTodos = () => {
  const { currentDateString, currentDateYYYYMMDD: currentDateFormat } =
    useAppSelect((state) => state.calendar);

  const queryArg: useGetAllTodosQueryArg = {
    date: currentDateFormat,
  };

  const { data, isLoading, isError, error, refetch } =
    useGetAllTodosQuery(queryArg);

  return {
    data: data ? [...data.todos] : [],
    isLoading,
    isError,
    error,
    refetch,
    getAllTodoQueryArg: queryArg,
  };
};

export default useTodos;
