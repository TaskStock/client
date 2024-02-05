import dayjs from "dayjs";
import { useAppDispatch, useAppSelect } from "../store/configureStore.hooks";
import React, { useEffect } from "react";
import { updateCalendarItemTodoCount } from "../store/modules/calendar";
import { getAllTodosQuery } from "../store/modules/todo/queries";
import { Todo } from "../@types/todo";

export const useCalculateTodoCount = ({
  todos,
}: {
  todos: Todo[] | undefined;
}) => {
  const currentDate = dayjs(
    useAppSelect((state) => state.calendar.currentDateString)
  );

  const memorizedCurrentDate = React.useRef(
    dayjs(currentDate).format("YYYY-MM")
  );

  const dispatch = useAppDispatch();

  // const recalculate = React.useCallback(() => {
  //   memorizedCurrentDate.current = dayjs(currentDate).format("YYYY-MM");
  //   dispatch(updateCalendarItemTodoCount({ todos: todos || [] }));
  // }, [dispatch, todos]);

  const recalculate = () => {
    memorizedCurrentDate.current = dayjs(currentDate).format("YYYY-MM");
    dispatch(updateCalendarItemTodoCount({ todos: todos || [] }));
  };

  useEffect(() => {
    if (
      todos &&
      dayjs(currentDate).format("YYYY-MM") !== memorizedCurrentDate.current
    ) {
      console.log(todos.length, "recalculate");

      recalculate();
    }
  }, [currentDate, getAllTodosQuery, todos]);

  return { recalculate };
};
