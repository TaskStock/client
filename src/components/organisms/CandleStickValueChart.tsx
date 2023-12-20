import { View, Text } from "react-native";
import React, { memo } from "react";
import {
  VictoryAxis,
  VictoryCandlestick,
  VictoryChart,
  VictoryContainer,
} from "victory-native";
import { Value } from "./HomeChart";
import { DefaultTheme } from "styled-components/native";

function CandleStickValueChart({
  width,
  height,
  data,
  theme,
}: {
  width: number;
  height: number;
  data: Value[];
  theme: DefaultTheme;
}) {
  const maxY = Math.max(...data.map((item) => parseInt(item.high)));
  const minY = Math.min(...data.map((item) => parseInt(item.low)));
  const twoThirds = minY + ((maxY - minY) * 2) / 3;
  const oneThird = minY + ((maxY - minY) * 1) / 3;

  return (
    <VictoryChart
      width={width}
      height={height}
      padding={{
        left: 30,
        right: 30,
        top: 10,
        bottom: 10,
      }}
    >
      <VictoryCandlestick
        domain={{ y: [minY, maxY + 1.5] }}
        data={data}
        candleWidth={5.368}
        containerComponent={<VictoryContainer responsive={false} />}
        candleColors={{
          positive: theme.high,
          negative: theme.low,
        }}
        style={{
          data: {
            stroke: theme.palette.neutral600_gray,
            strokeWidth: 0,
          },
        }}
        wickStrokeWidth={1}
      ></VictoryCandlestick>
      <VictoryAxis
        dependentAxis
        tickValues={[twoThirds, oneThird]}
        tickFormat={() => ""}
        style={{
          axis: {
            stroke: "transparent",
          },
          grid: {
            // stroke: "transparent",
            stroke: theme.palette.neutral500_gray,
            // strokeDasharray: [5, 5],
          },
        }}
      />
    </VictoryChart>
  );
}

export default memo(CandleStickValueChart);
