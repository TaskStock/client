import { client } from "../services/api";

export const myFetchFunction = (baseUrl) => {
  return async (args, api, extraOptions) => {
    const endPoint = args.url.substring(1);

    const accessToSend = api.getState().auth.accessToken.replace(/^"|"$/g, "");

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
