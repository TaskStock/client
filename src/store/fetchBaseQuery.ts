import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { setAccessToken } from "./modules/auth";
import { LOCAL_API_HOST_IOS } from "@env";
import { TRootState } from "./configureStore";
import { checkAndRenewTokens } from "../utils/authUtils/tokenUtils";

const originalBaseQuery = fetchBaseQuery({
  baseUrl: LOCAL_API_HOST_IOS,
  prepareHeaders: (headers, { getState, endpoint, extra, type, forced }) => {
    const rootState = getState() as TRootState;

    const token = rootState.auth.accessToken;

    console.log("token", token, LOCAL_API_HOST_IOS);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");

    return headers;
  },
});

// 현재 state에는 accessToken이 있다.

const BaseQueryWithAuth: BaseQueryFn<
  string | { url: string; method: string; body: any },
  unknown,
  unknown
> = async (args, api, extraOptions) => {
  let result = await originalBaseQuery(args, api, extraOptions);

  if (result.error && result.error.originalStatus === 401) {
    console.log("401 에러 발생, 토큰 갱신 시도");

    // await api.dispatch(checkAndRenewTokens());

    const result = await originalBaseQuery(args, api, extraOptions);

    return result;
  }

  return result;
};

const wrappedFetchBaseQuery = (...args) => {
  console.log("making api call", ...args);
  return BaseQueryWithAuth(...args);
};

export default wrappedFetchBaseQuery;
