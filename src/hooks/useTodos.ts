import dayjs from "dayjs";
import { useAppSelect } from "../store/configureStore.hooks";
import { useGetAllTodosQuery } from "../store/modules/todo/todo";
import { DateStringYYYYMM } from "../@types/calendar";
import { useGetAllTodosQueryArg } from "../store/modules/todo/queries";
import { checkIsLocalBetween6to6 } from "../utils/checkIsSameLocalDay";

const useTodos = () => {
  const { currentDateString } = useAppSelect((state) => state.calendar);

  const currentDateYYYYMMLocal = dayjs(currentDateString)
    .local()
    .format("YYYY-MM") as DateStringYYYYMM;

  const queryArg: useGetAllTodosQueryArg = {
    date: currentDateYYYYMMLocal,
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
