import { getAPIHost } from "../utils/getAPIHost";

export async function client<T = any>(
  endpoint: string,
  { body, ...customConfig }: { body?: any; [key: string]: any } = {}
): Promise<T> {
  const SERVER_URL = getAPIHost();
  const headers = { "Content-Type": "application/json" };

  const config: RequestInit = {
    method: body ? "POST" : "GET",
    headers: {
      ...headers,
      ...customConfig.headers,
    },
    ...customConfig,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(SERVER_URL + endpoint, config);
    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || response.statusText;
      throw new Error(errorMessage);
    }

    return data;
  } catch (err) {
    return Promise.reject(err.message);
  }
}

client.get = function <T = any>(
  endpoint: string,
  customConfig: { [key: string]: any } = {}
): Promise<T> {
  return client<T>(endpoint, { ...customConfig, method: "GET" });
};

client.post = function <T = any>(
  endpoint: string,
  body: any,
  customConfig: { [key: string]: any } = {}
): Promise<T> {
  return client<T>(endpoint, { ...customConfig, body });
};
