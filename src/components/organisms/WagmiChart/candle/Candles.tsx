import * as React from "react";
import { Line, Svg, SvgProps } from "react-native-svg";

import { CandlestickChartDimensionsContext } from "./Chart";
import { CandlestickChartCandle, CandlestickChartCandleProps } from "./Candle";
import { useCandlestickChart } from "./useCandlestickChart";
import { interpolate } from "react-native-reanimated";

type CandlestickChartCandlesProps = SvgProps & {
  width?: number;
  height?: number;
  margin?: CandlestickChartCandleProps["margin"];
  positiveColor?: CandlestickChartCandleProps["positiveColor"];
  negativeColor?: CandlestickChartCandleProps["negativeColor"];
  lineColor?: CandlestickChartCandleProps["lineColor"];
  domainDividerColor?: string;
  renderRect?: CandlestickChartCandleProps["renderRect"];
  renderLine?: CandlestickChartCandleProps["renderLine"];
  rectProps?: CandlestickChartCandleProps["rectProps"];
  lineProps?: CandlestickChartCandleProps["lineProps"];
  candleProps?: Partial<CandlestickChartCandleProps>;
  useAnimations?: boolean;
};

export function CandlestickChartCandles({
  positiveColor,
  negativeColor,
  rectProps,
  lineProps,
  lineColor,
  domainDividerColor = "#CCCCCF",
  margin,
  useAnimations = true,
  renderRect,
  renderLine,
  candleProps,
  ...props
}: CandlestickChartCandlesProps) {
  const { width, height } = React.useContext(CandlestickChartDimensionsContext);
  const { data, domain, step } = useCandlestickChart();

  const oneThirdDomainValue = domain[0] + (domain[1] - domain[0]) / 3;
  const oneThirdLineHeight = interpolate(oneThirdDomainValue, domain, [
    height,
    0,
  ]);

  const twoThirdDomainValue = domain[0] + ((domain[1] - domain[0]) * 2) / 3;
  const twoThirdLineHeight = interpolate(twoThirdDomainValue, domain, [
    height,
    0,
  ]);

  ////////////////////////////////////////////////

  return (
    <Svg width={width} height={height} {...props}>
      <Line
        x1={0}
        x2={width}
        y1={oneThirdLineHeight}
        y2={oneThirdLineHeight}
        stroke={domainDividerColor}
      />
      <Line
        x1={0}
        x2={width}
        y1={twoThirdLineHeight}
        y2={twoThirdLineHeight}
        stroke={domainDividerColor}
      />
      {step > 0 &&
        data.map((candle, index) => (
          <CandlestickChartCandle
            key={index as React.Key}
            domain={domain}
            margin={margin}
            maxHeight={height}
            width={step}
            positiveColor={positiveColor}
            negativeColor={negativeColor}
            lineColor={lineColor}
            renderRect={renderRect}
            renderLine={renderLine}
            rectProps={rectProps}
            lineProps={lineProps}
            useAnimations={useAnimations}
            candle={candle}
            index={index}
            {...candleProps}
          />
        ))}
    </Svg>
  );
}
