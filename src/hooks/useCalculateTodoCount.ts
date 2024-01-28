import dayjs from "dayjs";
import { useAppDispatch, useAppSelect } from "../store/configureStore.hooks";
import React, { useEffect } from "react";
import { updateCalendarItemTodoCount } from "../store/modules/calendar";
import { getAllTodosQuery } from "../store/modules/todo/queries";

export const useCalculateTodoCount = ({ todos }) => {
  const currentDate = dayjs(
    useAppSelect((state) => state.calendar.currentDateString)
  );

  const memorizedCurrentDate = React.useRef(
    dayjs(currentDate).format("YYYY-MM")
  );

  const dispatch = useAppDispatch();

  const recalculate = React.useCallback(() => {
    memorizedCurrentDate.current = dayjs(currentDate).format("YYYY-MM");
    dispatch(updateCalendarItemTodoCount({ todos }));
  }, [dispatch, todos]);

  useEffect(() => {
    if (
      todos &&
      dayjs(currentDate).format("YYYY-MM") !== memorizedCurrentDate.current
    ) {
      recalculate();
    }
  }, [currentDate, getAllTodosQuery]);

  return { recalculate };
};
