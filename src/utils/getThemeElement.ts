import { DefaultTheme } from "styled-components/native";

export const getThemeElement = (theme: DefaultTheme) => {
  return {
    reverseButtonText: theme.name == "gray" ? theme.textReverse : theme.text,
  };
};
