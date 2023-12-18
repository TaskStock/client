import "styled-components";
import { palette } from "../constants/colors";

declare module "styled-components" {
  export interface DefaultTheme {
    palette: typeof palette;
    text: string;
    textDim: string;
    textDimmer: string;
    background: string;
    box: string;
    high: string;
    low: string;
  }
}
