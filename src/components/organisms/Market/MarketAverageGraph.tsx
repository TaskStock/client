import React from "react";
import { View } from "react-native";
import { useTheme } from "styled-components/native";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
} from "victory-native";

const MarketAverageGraph = ({
  data,
  size: { width, height },
  fillCondition,
}: {
  data: { x: string; y: number; fake: boolean }[];
  size: {
    width: number;
    height: number;
  };
  fillCondition: ({
    datum,
  }: {
    datum: { x: string; y: number; fake: boolean };
  }) => string;
}) => {
  const theme = useTheme();

  const tickFormat = data.map((point) => {
    if (point.fake) {
      return "";
    }
    return point.x;
  });

  return (
    <View style={{ flex: 1 }}>
      <VictoryChart width={width} height={height}>
        {/* Bar chart */}
        <VictoryBar
          data={data}
          style={{
            data: {
              fill: fillCondition,
            },
          }}
        />

        {/* X-axis */}
        <VictoryAxis
          tickValues={[1, 2]}
          // tickFormat={["", "me", "average", ""]}
          tickFormat={tickFormat}
          style={{
            axis: { stroke: theme.textDimmer, strokeWidth: 1 },
            ticks: { stroke: "transparent" },
            tickLabels: { fontSize: 12, padding: 5 },
          }}
        />

        {/* Y-axis */}
        {/* <VictoryAxis dependentAxis /> */}

        {/* Percentage labels above the bars */}
        {/* {data.map((point) => (
          <VictoryLabel
            key={point.x}
            x={point.x === "me" ? 1 : 2}
            y={point.y + 2} // Adjust the position as needed
            text={`${point.y}%`}
            style={{ fontSize: 12, fill: "black" }}
          />
        ))} */}
      </VictoryChart>
    </View>
  );
};

export default MarketAverageGraph;
