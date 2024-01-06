import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { logout, setAccessToken } from "./modules/auth";
import { LOCAL_API_HOST } from "@env";
import { RootState } from "./configureStore";

const originalBaseQuery = fetchBaseQuery({
  baseUrl: LOCAL_API_HOST,
  prepareHeaders: (headers, { getState, endpoint, extra, type, forced }) => {
    const rootState = getState() as RootState;

    const token = rootState.auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const BaseQueryWithAuth: BaseQueryFn<
  string | { url: string; method: string; body: any },
  unknown,
  unknown
> = async (args, api, extraOptions) => {
  let result = await originalBaseQuery(args, api, extraOptions);

  if (result.error && result.error.originalStatus === 401) {
    // try to get a new token
    const rootState = api.getState() as RootState;

    const refreshToken = rootState.auth.refreshToken;

    if (!refreshToken) {
      api.dispatch(logout());
      return;
    }

    const refreshResult = await fetch(`${LOCAL_API_HOST}/account/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (refreshResult.ok) {
      const response = await refreshResult.json();
      const newAccessToken = response.accessToken;

      console.log("get new access token", newAccessToken);

      api.dispatch(setAccessToken(newAccessToken));

      result = await originalBaseQuery(args, api, extraOptions);
      return result;
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

const wrappedFetchBaseQuery = (...args) => {
  console.log("making api call", ...args);
  return BaseQueryWithAuth(...args);
};

export default wrappedFetchBaseQuery;
