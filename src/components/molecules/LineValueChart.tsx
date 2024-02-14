import React, { useContext } from "react";
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
import { Circle, Svg } from "react-native-svg";
import { palette } from "../../constants/colors";
import { View } from "react-native";

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
  data,
  width,
  height,
}: {
  data: {
    end: number;
  }[];
  width: number;
  height: number;
}) {
  const theme = useTheme();

  if (data.length === 0) return <></>;

  const lineData = data.map((item, index) => ({
    x: index,
    // y: item.end,
    y: Math.floor(item.end * 1000) / 1000,
  }));

  const maxY = Math.max(...lineData.map((item) => item.y));
  const minY = Math.min(...lineData.map((item) => item.y));
  const twoThirds = minY + ((maxY - minY) * 2) / 3;
  const oneThird = minY + ((maxY - minY) * 1) / 3;

  let maxYWithPadding = maxY + (maxY - minY) / 3;
  let minYWithPadding = minY - (maxY - minY) / 3;

  if (maxYWithPadding === minYWithPadding) {
    maxYWithPadding = maxYWithPadding + 1;
    minYWithPadding = minYWithPadding - 1;
  }

  return (
    <VictoryChart
      width={width}
      height={height}
      padding={{}}
      containerComponent={
        <VictoryZoomContainer zoomDimension="x"></VictoryZoomContainer>
      }
      style={{}}
    >
      <VictoryLine
        theme={VictoryTheme.material}
        domain={{
          y: [minYWithPadding, maxYWithPadding],
          x: [-1, 31],
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
