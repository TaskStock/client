import { Platform } from "react-native";

export const _ANDROID_API_HOST = "http://10.0.2.2:8000/";
export const _IOS_API_HOST = "http://127.0.0.1:8000/";

export const getAPIHost = (): string => {
  if (Platform.OS === "ios") {
    return _IOS_API_HOST;
  } else if (Platform.OS === "android") {
    return _ANDROID_API_HOST;
  } else {
    throw "Platform not supported";
  }
};
