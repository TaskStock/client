import dayjs from "dayjs";
import { useAppSelect } from "../store/configureStore.hooks";
import { useGetAllTodosQuery } from "../store/modules/todo/todo";

const useTodos = () => {
  const { currentDateString, currentDateYYYYMMDD } = useAppSelect(
    (state) => state.calendar
  );
  const { data, isLoading, isError, error, refetch } = useGetAllTodosQuery({
    date: dayjs(currentDateString).format("YYYY-MM"),
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
