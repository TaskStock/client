import { BaseQueryApi } from "@reduxjs/toolkit/query";
import { client } from "../services/api";
import { checkAndRenewTokens } from "../utils/authUtils/tokenUtils";
import { TRootState } from "./configureStore";

export const myFetchFunction = (baseUrl) => {
  return async (args, api: BaseQueryApi, extraOptions) => {
    const endPoint = args.url.substring(1);
    await api.dispatch(checkAndRenewTokens());
    const rootState = api.getState() as TRootState;

    const accessToSend = rootState.auth.accessToken.replace(/^"|"$/g, "");
    try {
      const data = await client(`${endPoint}`, {
        method: args.method,
        body: args.body,
        accessToken: accessToSend,
      });

      return {
        data: data,
      };
    } catch (err) {
      console.log("Error in myFetchFunction");

      console.log(err);

      return {
        error: {
          status: 500,
          data: err,
        },
      };
    }
  };
};
