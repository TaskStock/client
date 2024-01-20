import { PermissionsAndroid, Platform } from "react-native";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

const imagePermissionCheck = async () => {
  let permission;

  // 플랫폼별 권한 정의
  if (Platform.OS === "ios") {
    permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
  } else if (Platform.OS === "android") {
    permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    // permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
  }

  try {
    // 권한 상태 확인
    const result = await check(permission);

    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.log(
          "접근 불가능한 상태 (Android에서는 사용자가 권한을 부여하지 않음, iOS에서는 권한이 없음)"
        );
        return false;
      case RESULTS.DENIED:
        console.log(
          "사용자가 권한을 거부했지만, 요청할 수 있음 (Android에서만 해당)"
        );
        // 권한 요청
        const requestResult = await request(permission);
        return requestResult === RESULTS.GRANTED;
      case RESULTS.LIMITED:
        console.log("접근 가능하지만, 권한이 제한됨 (iOS에서만 해당)");
        return true;
      case RESULTS.GRANTED:
        console.log("권한이 부여됨");
        return true;
      case RESULTS.BLOCKED:
        console.log("사용자가 권한을 거부했고, 더 이상 요청할 수 없음");
        return false;
    }
  } catch (error) {
    console.warn(error);
    return false;
  }
};

export default imagePermissionCheck;
