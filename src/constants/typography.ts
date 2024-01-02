const fonts = {
  Pretendard: {
    weight100: require("../../assets/fonts/Pretendard-Thin.otf"),
    weight200: require("../../assets/fonts/Pretendard-ExtraLight.otf"),
    weight300: require("../../assets/fonts/Pretendard-Light.otf"),
    weight400: require("../../assets/fonts/Pretendard-Regular.otf"),
    weight500: require("../../assets/fonts/Pretendard-Medium.otf"),
    weight600: require("../../assets/fonts/Pretendard-SemiBold.otf"),
    weight700: require("../../assets/fonts/Pretendard-Bold.otf"),
    weight800: require("../../assets/fonts/Pretendard-ExtraBold.otf"),
    weight900: require("../../assets/fonts/Pretendard-Black.otf"),
  },
};

export const customFontsToLoad = {
  light: fonts.Pretendard.weight100,
  regular: fonts.Pretendard.weight400,
  medium: fonts.Pretendard.weight500,
  semibold: fonts.Pretendard.weight600,
  bold: fonts.Pretendard.weight700,
  extraBold: fonts.Pretendard.weight800,
};
