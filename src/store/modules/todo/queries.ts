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
        // FIXME. 그런데 이렇게 보낼때. 1월 1일 오전 9시 이전이라면.
        // 이게 그 전의 달의 데이터를 가져오지 않겠는가?
        url: `/todo/onemonth?date=${body.date}`,
        method: "GET",
      };
    },
    providesTags: ["Todos"],

    async onCacheEntryAdded(arg, { cacheDataLoaded, dispatch }) {
      console.log("onCacheEntryAdded");

      const response = await cacheDataLoaded;

      dispatch(updateCalendarItemTodoCount({ todos: response.data.todos }));
    },
  });
