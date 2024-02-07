import { client } from "../services/api";
import { useAppDispatch } from "../store/configureStore.hooks";
import { checkAndRenewTokens } from "../utils/authUtils/tokenUtils";

interface IClient {
  body?: any;
  accessToken?: string;
  [key: string]: any;
}

export const useClient = (dispatch) => {
  const wrappedClient = async (
    endpoint,
    { body, accessToken, ...customConfig }: IClient = {},
    method = undefined
  ) => {
    const tokenResult = await dispatch(checkAndRenewTokens());
    console.log("tokenResult: ", tokenResult);

    const AT = tokenResult.payload?.accessToken
      ? tokenResult.payload.accessToken
      : accessToken;

    const config = method ? { ...customConfig, method } : customConfig;
    return client(endpoint, { body, accessToken: AT, ...config });
  };

  const clientMethods = {
    get: (endpoint, customConfig: { [key: string]: any } = {}) =>
      wrappedClient(endpoint, { ...customConfig, method: "GET" }),

    post: (endpoint, body, customConfig: { [key: string]: any } = {}) =>
      wrappedClient(endpoint, { ...customConfig, body, method: "POST" }),

    delete: (endpoint, body, customConfig: { [key: string]: any } = {}) =>
      wrappedClient(endpoint, { ...customConfig, body, method: "DELETE" }),

    patch: (endpoint, body, customConfig: { [key: string]: any } = {}) =>
      wrappedClient(endpoint, { ...customConfig, body, method: "PATCH" }),

    put: (endpoint, body, customConfig: { [key: string]: any } = {}) =>
      wrappedClient(endpoint, { ...customConfig, body, method: "PUT" }),
  };

  return clientMethods;
};
