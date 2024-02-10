import AsyncStorage from "@react-native-async-storage/async-storage";

// 데이터 저장
export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);

    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error("AsyncStorage Error: ", e);
  }
};

// 데이터 가져오기
export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("AsyncStorage Error: ", e);
  }
};
// 데이터 제거
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error("AsyncStorage Error: ", e);
  }
};

// 데이터 확인
export const checkStorage = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    const accessExp = await AsyncStorage.getItem("accessExp");
    const refreshExp = await AsyncStorage.getItem("refreshExp");
    const theme = await AsyncStorage.getItem("theme");
    const strategy = await AsyncStorage.getItem("strategy");
    const deviceId = await AsyncStorage.getItem("deviceId");
    const firstTime = await AsyncStorage.getItem("firstTime");
    // const language = await AsyncStorage.getItem("language");
    console.log("===== AsyncStorage Check =====");
    console.log("firstTime: ", firstTime);
    // console.log("accessToken: ", accessToken);
    // console.log("refreshToken: ", refreshToken);
    // console.log("accessExp: ", accessExp);
    // console.log("refreshExp: ", refreshExp);
    // console.log("theme: ", theme);
    // console.log("strategy: ", strategy);
    // console.log("deviceId: ", deviceId);
  } catch (error) {
    console.error("Error reading values from AsyncStorage", error);
  }
};
