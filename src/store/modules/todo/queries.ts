import dayjs from "dayjs";
import { DateString, DateStringYYYYMM } from "../../../@types/calendar";
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
        // FIXME. 그런데 이렇게 보낼때. 1월 1일 오전 9시 이전이라면.
        // 이게 그 전의 달의 데이터를 가져오지 않겠는가?
        url: `/todo/onemonth?date=${dayjs(body.date).format("YYYY-MM")}`,
        method: "GET",
      };
    },
    providesTags: ["Todos"],

    async onCacheEntryAdded(arg, { cacheDataLoaded, dispatch }) {
      const response = await cacheDataLoaded;
      console.log("cacheEntry", response);
    },
  });
