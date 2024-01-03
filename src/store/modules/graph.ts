import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const initialState = {
  data: [],
};

const BASE_URL_TEMP = "https://localhost:5001/api/";

export const graphApi = createApi({
  reducerPath: "valueApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_TEMP,
    prepareHeaders: (headers, { getState, endpoint, extra, type, forced }) => {
      // const token = getState().auth.token;
      // if (token) {
      //   headers.set("Authorization", `Bearer ${token}`);
      // }
      // return headers;
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getValueByType: builder.query({
      query: ({ type, requestTime }) =>
        `values?type=${type}&requestTime=${requestTime}`,
    }),
  }),
});

const valueSlice = createSlice({
  name: "value",
  initialState,
  reducers: {},
});

export default valueSlice.reducer;

export const { toggleGraphType } = valueSlice.actions;
export const { useGetValueByTypeQuery } = graphApi;
