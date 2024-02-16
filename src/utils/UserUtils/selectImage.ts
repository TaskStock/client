import {
  ImageLibraryOptions,
  MediaType,
  launchImageLibrary,
} from "react-native-image-picker";
import { showErrorToast } from "../showToast";

export const selectImage = async () => {
  try {
    const options: ImageLibraryOptions = {
      mediaType: "photo" as MediaType,
      quality: 1,
    };

    const result = await launchImageLibrary(options);

    if (result.didCancel) {
      console.log("이미지 선택 취소");
    } else if (result.errorCode) {
      showErrorToast("이미지 선택 중 에러가 발생했습니다.");
      console.log("ImagePicker Error: ", result.errorMessage);
    } else {
      const imageFile = result.assets ? result.assets[0] : null;
      console.log("Selected image: ", result.assets);
      return imageFile;
    }
  } catch (error) {
    showErrorToast("이미지 선택 중 에러가 발생했습니다.");
    console.error("이미지 선택 중 에러: ", error);
  }
};
