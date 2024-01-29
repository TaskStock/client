import { Platform } from "react-native";
import { LOCAL_API_HOST_ANDROID, LOCAL_API_HOST_IOS } from "@env";


export const _ANDROID_API_HOST = `${LOCAL_API_HOST_ANDROID}`;
export const _IOS_API_HOST = `${LOCAL_API_HOST_IOS}`;

// const _IOS_API_HOST = "http://127.0.0.1:8000/";
// const _ANDROID_API_HOST = "http://10.0.2.2:8000/";

export const getAPIHost = (): string => {
  console.log("LOCAL_API_HOST_ANDROID", LOCAL_API_HOST_ANDROID);
  if (Platform.OS === "ios") {
    return _IOS_API_HOST;
  } else if (Platform.OS === "android") {
    return _ANDROID_API_HOST;
  } else {
    throw "Platform not supported";
  }
};
