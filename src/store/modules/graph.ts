import { LOCAL_API_HOST } from "@env";
import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const initialState = {
  data: [],
};

export const graphApi = createApi({
  reducerPath: "valueApi",
  baseQuery: fetchBaseQuery({
    baseUrl: LOCAL_API_HOST,
    prepareHeaders: (headers, { getState, endpoint, extra, type, forced }) => {
      // const token = getState().auth.token;
      // if (token) {
      // headers.set("Authorization", `Bearer ${token}`);
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

export const {} = valueSlice.actions;
export const { useGetValueByTypeQuery } = graphApi;
