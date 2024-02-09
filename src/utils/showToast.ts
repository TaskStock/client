import Toast from "react-native-toast-message";

export const showSuccessToast = (text1: string) => {
  Toast.show({
    type: "success",
    text1,
    visibilityTime: 2000,
    keyboardOffset: 100,
    topOffset: 60,
  });
};

export const showErrorToast = (text1: string) => {
  Toast.show({
    type: "error",
    text1,
    visibilityTime: 2000,
    keyboardOffset: 100,
    topOffset: 60,
  });
};
