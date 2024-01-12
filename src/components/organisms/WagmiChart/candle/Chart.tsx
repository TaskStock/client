import * as React from "react";
import { Dimensions, View, ViewProps } from "react-native";

import { useCandlestickChart } from "./useCandlestickChart";
import { sizeContext } from "../../Home/GraphContainer";
import { spacing } from "../../../../constants/spacing";

export const CandlestickChartDimensionsContext = React.createContext({
  width: 0,
  height: 0,
});

type CandlestickChartProps = ViewProps & {
  children: React.ReactNode;
  width?: number;
  height?: number;
};

const { width: screenWidth } = Dimensions.get("window");

export function CandlestickChart({
  children,
  width = screenWidth,
  height = screenWidth,
  ...props
}: CandlestickChartProps) {
  const { setWidth, setHeight } = useCandlestickChart();

  const { width: contextWidth, height: contextHeight } =
    React.useContext(sizeContext);

  const contextWidthWithPadding = React.useMemo(
    () => contextWidth - spacing.padding,
    [contextWidth]
  );

  const contextHeightWithPadding = React.useMemo(
    () => contextHeight - spacing.padding,
    [contextHeight]
  );

  React.useEffect(() => {
    setWidth(contextWidthWithPadding);
    setHeight(contextHeightWithPadding);
  }, [height, setHeight, setWidth, width]);

  const contextValue = React.useMemo(
    () => ({
      width: contextWidthWithPadding,
      height: contextHeightWithPadding,
    }),
    [contextHeightWithPadding, contextWidthWithPadding]
  );

  // const contextValue = React.useMemo(
  //   () => ({
  //     width,
  //     height,
  //   }),
  //   [height, width]
  // );

  return (
    <CandlestickChartDimensionsContext.Provider value={contextValue}>
      <View {...props}>{children}</View>
    </CandlestickChartDimensionsContext.Provider>
  );
}
