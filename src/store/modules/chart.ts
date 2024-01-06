import { LOCAL_API_HOST } from "@env";
import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import wrappedFetchBaseQuery from "../fetchBaseQuery";
import { Value } from "../../@types/chart";

const initialState = {
  data: [],
};

export const chartApi = createApi({
  reducerPath: "chartApi",
  baseQuery: wrappedFetchBaseQuery,
  endpoints: (builder) => ({
    getValues: builder.query<
      {
        values: Value[];
      },
      {
        startDate: string;
        endDate: string;
      }
    >({
      query: (body: { startDate: string; endDate: string }) => ({
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
