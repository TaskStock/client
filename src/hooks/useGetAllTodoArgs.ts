import dayjs from "dayjs";
import { useAppSelect } from "../store/configureStore.hooks";
import { DateStringYYYYMM } from "../@types/calendar";
import { useGetAllTodosQueryArg } from "../store/modules/todo/queries";

export const useGetAllTodoArgs = () => {
  const { currentDateString } = useAppSelect((state) => state.calendar);

  const currentDateYYYYMMLocal = dayjs(currentDateString)
    .local()
    .format("YYYY-MM") as DateStringYYYYMM;

  const queryArg: useGetAllTodosQueryArg = {
    date: currentDateYYYYMMLocal,
  };

  return queryArg;
};
