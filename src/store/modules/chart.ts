import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import wrappedFetchBaseQuery from "../fetchBaseQuery";
import { Value } from "../../@types/chart";
import { DateString } from "../../@types/calendar";
import { myFetchFunction } from "../myFetchFunction";

const initialState = {
  data: [],
};

export interface useGetValuesQueryArg {
  startDate: DateString;
  endDate: DateString;
}

export type useGetValuesQueryStartDate = Pick<
  useGetValuesQueryArg,
  "startDate"
>["startDate"];
export type useGetValuesQueryEndDate = Pick<
  useGetValuesQueryArg,
  "endDate"
>["endDate"];

export const chartApi = createApi({
  reducerPath: "chartApi",
  baseQuery: myFetchFunction(""),
  endpoints: (builder) => ({
    getValues: builder.query<
      {
        values: Value[];
      },
      useGetValuesQueryArg
    >({
      query: (body) => ({
        url: `/value/getValues?start_date=${body.startDate}&end_date=${body.endDate}`,
        method: "GET",
      }),
    }),
  }),
});

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {},
});

export default chartSlice.reducer;

export const {} = chartSlice.actions;
export const { useGetValuesQuery } = chartApi;
