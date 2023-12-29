import React from "react";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
} from "victory-native";
import { useTheme } from "styled-components/native";
import { Value } from "../../@types/chart";

export default function LineValueChart({
  width,
  height,
  data,
  maxLength,
}: {
  data: Value[];
  width: number;
  height: number;
  maxLength: number;
}) {
  const theme = useTheme();

  const lineData = data.map((item, index) => ({
    x: index,
    y: Number(item.close),
  }));

  const maxY = Math.max(...lineData.map((item) => item.y));
  const minY = Math.min(...lineData.map((item) => item.y));
  const twoThirds = minY + ((maxY - minY) * 2) / 3;
  const oneThird = minY + ((maxY - minY) * 1) / 3;

  const maxYWithPadding = maxY + (maxY - minY) / 3;
  const minYWithPadding = minY - (maxY - minY) / 3;

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
      <VictoryLine
        theme={VictoryTheme.material}
        domain={{
          y: [minYWithPadding, maxYWithPadding],
          x: [0, maxLength - 1],
        }}
        style={{
          data: {
            stroke: theme.palette.red,
            strokeWidth: 3,
          },
        }}
        data={lineData}
      ></VictoryLine>
      <VictoryAxis
        dependentAxis
        tickValues={[twoThirds, oneThird]}
        tickFormat={() => ""}
        style={{
          axis: {
            stroke: "transparent",
          },
          grid: {
            stroke: theme.palette.neutral500_gray,
          },
        }}
      />
    </VictoryChart>
  );
}
