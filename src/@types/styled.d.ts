import { palette } from "../constants/colors";
import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    palette: typeof palette;
    text: string;
    textDim: string;
    textReverse: string;
    textDimmer: string;
    background: string;
    mainBtnGray: string;
    subBtnGray: string;
    box: string;
    high: string;
    low: string;
  }
}
