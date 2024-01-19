import {
  ImageLibraryOptions,
  MediaType,
  launchImageLibrary,
} from "react-native-image-picker";

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
      console.log("ImagePicker Error: ", result.errorMessage);
    } else {
      const imageUri = result.assets ? result.assets[0].uri : null;
      console.log("Selected image URI: ", imageUri);
      return imageUri;
    }
  } catch (error) {
    console.error("이미지 선택 중 에러: ", error);
  }
};
