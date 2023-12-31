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

    console.log("AsyncStorage Check => accessToken: ", accessToken);
    console.log("AsyncStorage Check => refreshToken: ", refreshToken);
  } catch (error) {
    console.error("Error reading values from AsyncStorage", error);
  }
};
