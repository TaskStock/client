import dayjs from "dayjs";
import { DateString, DateStringYYYYMM } from "../../../@types/calendar";
import { TodoApiBuilder, useGetAllTodosQuery } from "./todo";
import { updateCalendarItemTodoCount } from "../calendar";
import { Todo } from "../../../@types/todo";

interface getAllTodosResponse {
  todos: Todo[];
}

export interface useGetAllTodosQueryArg {
  date: DateStringYYYYMM;
}

export type useGetAllTodosQueryDate = Pick<
  useGetAllTodosQueryArg,
  "date"
>["date"];

export const getAllTodosQuery = (builder: TodoApiBuilder) =>
  builder.query<getAllTodosResponse, useGetAllTodosQueryArg>({
    query: (body) => {
      return {
        url: `/todo/onemonth?date=${body.date}`,
        method: "GET",
      };
    },
    providesTags: ["Todos"],

    async onCacheEntryAdded(arg, { cacheDataLoaded, dispatch }) {
      const response = await cacheDataLoaded;

      dispatch(updateCalendarItemTodoCount({ todos: response.data.todos }));
    },
  });
