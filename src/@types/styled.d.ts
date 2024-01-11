import { palette } from "../constants/colors";
import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    palette: typeof palette;
    name: "gray" | "dark";
    text: string;
    textDim: string;
    textReverse: string;
    textDimmer: string;
    textDimReverse: string;
    background: string;
    mainBtnGray: string;
    mainBtnReversed: string;
    subBtnGray: string;
    box: string;
    high: string;
    low: string;
  }
}
