import { Alert, Linking, PermissionsAndroid, Platform } from "react-native";

const imagePermissionCheck = async () => {
  // iOS의 경우, 별도의 권한 확인 없이 true를 반환
  if (Platform.OS === "ios") {
    return true; // iOS에서는 react-native-image-picker가 권한 관리
  }

  // Android SDK 버전 체크 및 적절한 권한 요청
  const sdkVersion =
    typeof Platform.Version === "number"
      ? Platform.Version
      : parseInt(Platform.Version, 10);
  const permission = sdkVersion
    ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
    : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

  try {
    const granted = await PermissionsAndroid.request(permission, {
      title: "갤러리 접근 권한",
      message: "TASKSTOCK이 사진 저장소에 접근하려고 합니다.",
      buttonNegative: "취소",
      buttonPositive: "허용",
    });

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("The permission to access media images is granted");
      return true;
    } else {
      console.log("The permission to access media images is denied");
      Alert.alert(
        "갤러리 접근 권한 거부됨",
        "사진을 선택하려면 저장소 접근 권한이 필요합니다. 설정에서 권한을 허용해주세요.",
        [
          { text: "취소", style: "cancel" },
          { text: "설정으로 이동", onPress: () => Linking.openSettings() },
        ],
        { cancelable: false }
      );
      return false;
    }
  } catch (error) {
    console.warn("PermissionsAndroid request error:", error);
    return false;
  }
};

export default imagePermissionCheck;
