import { checkAndRenewTokens } from "../utils/authUtils/tokenUtils";
import { getAPIHost } from "../utils/getAPIHost";

interface IClient {
  body?: any;
  accessToken?: string;
  [key: string]: any;
}

export async function client<T = any>(
  endpoint: string,
  { body, accessToken, ...customConfig }: IClient = {}
): Promise<T> {
  // 토큰 유효한지 확인
  const fetchToken = async () => {
    try {
      const res = (await checkAndRenewTokens()) as any;
      if (res.accessToken) {
        console.log("새 AT로 교체: ", res.accessToken);
        return res.accessToken;
      }
      return accessToken;
    } catch (e) {
      console.log("토큰 유효성 검사 실패: ", e);
      return accessToken; // 에러 발생시 기존 토큰 반환
    }
  };

  const AT = await fetchToken();

  const SERVER_URL = getAPIHost();

  const headers = {
    "Content-Type": "application/json",
    ...(AT ? { Authorization: `Bearer ${AT}` } : {}),
  };

  const config: RequestInit = {
    method: customConfig.method,
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
    console.log(SERVER_URL + endpoint);

    const response = await fetch(SERVER_URL + endpoint, config);

    const data = await response.json();
    // console.log(SERVER_URL + endpoint);

    if (!response.ok) {
      console.log("response not ok:", data);

      const errorMessage = data.message || response.statusText;
      throw new Error(errorMessage);
    }

    return data;
  } catch (err) {
    console.log("fetch err: ", err);

    return Promise.reject(err.message);
  }
}

// method: 'GET'
client.get = function <T = any>(
  endpoint: string,
  customConfig: { [key: string]: any } = {}
): Promise<T> {
  return client<T>(endpoint, { ...customConfig, method: "GET" });
};

// method: 'POST'
client.post = function <T = any>(
  endpoint: string,
  body: any,
  customConfig: { [key: string]: any } = {}
): Promise<T> {
  return client<T>(endpoint, { ...customConfig, body, method: "POST" });
};

// method: 'DELETE'
client.delete = function <T = any>(
  endpoint: string,
  body: any,
  customConfig: { [key: string]: any } = {}
): Promise<T> {
  return client<T>(endpoint, { ...customConfig, body, method: "DELETE" });
};

// method: 'PATCH' : 리소스의 부분적인 수정
client.patch = function <T = any>(
  endpoint: string,
  body: any,
  customConfig: { [key: string]: any } = {}
): Promise<T> {
  return client<T>(endpoint, { ...customConfig, body, method: "PATCH" });
};

// method: 'PUT' : 리소스의 전체적인 수정 또는 생성
client.put = function <T = any>(
  endpoint: string,
  body: any,
  customConfig: { [key: string]: any } = {}
): Promise<T> {
  return client<T>(endpoint, { ...customConfig, body, method: "PUT" });
};
