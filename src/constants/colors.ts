const palette: Record<string, string> = {
  neutral100_gray: "#FFFFFF",
  neutral200_gray: "#F2F2F2",
  neutral300_gray: "#EDEEF0",
  neutral400_gray: "#D9DADE",
  neutral500_gray: "#CCCCCF",
  neutral600_gray: "#949496",
  neutral700_gray: "#191919",

  neutral100_dark: "#FFFFFF",
  neutral200_dark: "#898989",
  neutral300_dark: "#898989",
  neutral400_dark: "#4E4E4E",
  neutral500_dark: "#000000",
  neutral600_dark: "#292929",
  neutral700_dark: "#212121",

  red: "#D0191C",
  blue: "#0038FF",
  green: "#4DDE48",
} as const;

export const grayTheme = {
  palette,
  text: palette.neutral700_gray,
  textDim: palette.neutral600_gray,
  textDimmer: palette.neutral500_gray,
  background: palette.neutral300_gray,
  mainBtnGray: palette.neutral200_gray,
  subBtnGray: palette.neutral400_gray,
  box: palette.neutral100_gray,
  high: palette.red,
  low: palette.blue,
};

export const darkTheme = {
  palette,
  text: palette.neutral100_dark,
  textDim: palette.neutral300_dark,
  textDimmer: palette.neutral200_dark,
  background: palette.neutral500_dark,
  mainBtnGray: palette.neutral600_dark,
  subBtnGray: palette.neutral400_dark,
  box: palette.neutral700_dark,
  high: palette.red,
  low: palette.green,
};
