import { DateString } from "../../../@types/calendar";
import { TodoApiBuilder } from "./todo";

interface getAllTodosResponse {
  todos: {
    todo_id: number;
    content: string;
    check: boolean;
    date: string;
    level: number;
    index: number;
    project_id: number | null;
    repeat_day: string;
    repeat_end_date: string;
  }[];
}

export const getAllTodosQuery = (builder: TodoApiBuilder) =>
  builder.query<getAllTodosResponse, { date: DateString }>({
    query: (body) => {
      return {
        url: `/todo/onemonth?date=${body.date}`,
        method: "GET",
      };
    },
    providesTags: ["Todos"],

    async onCacheEntryAdded(arg, { cacheDataLoaded, dispatch }) {
      const response = await cacheDataLoaded;
      console.log("cacheEntry", response);
    },
  });
