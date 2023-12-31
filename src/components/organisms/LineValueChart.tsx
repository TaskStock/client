import React from "react";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictoryZoomContainer,
} from "victory-native";
import { useTheme } from "styled-components/native";
import { Value } from "../../@types/chart";
import { View } from "react-native";
import { Circle, Svg } from "react-native-svg";
import { palette } from "../../constants/colors";

const DotDataComponent = (props: any) => {
  const { x, y, datum } = props;

  return (
    <Svg>
      {/* Outer transparent circle */}
      <Circle
        cx={x}
        cy={y}
        r={15} // Set the radius to be slightly larger than the inner circle
        fill="rgba(255, 0, 0, 0.2)" // Slightly transparent red fill
      />
      <Circle
        cx={x}
        cy={y}
        r={5} // Set the radius to be slightly larger than the inner circle
        fill={palette.red} // Slightly transparent red fill
      />
    </Svg>
  );
};

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

  if (data.length === 0) return <></>;

  const lineData = data.map((item, index) => ({
    x: index,
    y: item.end,
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
      containerComponent={
        <VictoryZoomContainer zoomDimension="x"></VictoryZoomContainer>
      }
    >
      <VictoryLine
        theme={VictoryTheme.material}
        domain={{
          y: [minYWithPadding, maxYWithPadding],
          x: [-1, maxLength],
        }}
        style={{
          data: {
            stroke: theme.palette.red,
            strokeWidth: 4,
          },
        }}
        data={lineData}
      ></VictoryLine>
      <VictoryScatter
        dataComponent={<DotDataComponent />}
        data={[lineData[lineData.length - 1]]}
        style={{
          data: {
            fill: theme.palette.red,
          },
        }}
      ></VictoryScatter>
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
