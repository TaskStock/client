import React from "react";
import { View } from "react-native";
import { useTheme } from "styled-components/native";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
} from "victory-native";
import Text from "../../atoms/Text";

const MarketAverageGraph = ({
  data,
  size: { width, height },
  fillCondition,
  noData,
  labelType = "percentage",
}: {
  data: { x: string; y: number; fake?: boolean }[];
  size: {
    width: number;
    height: number;
  };
  labelType: "percentage" | "people";
  noData: boolean;
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

  const label = labelType === "percentage" ? "%" : "명";

  const barLabels = data.map((point) => {
    if (point.fake) {
      return ""; // 가짜 데이터에는 라벨 표시 안 함
    }
    return `${point.y}` + label; // y 값에 % 추가
  });

  return (
    <View style={{ flex: 1 }}>
      {noData ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text size="md" color={theme.textDim}>
            아직 종목 데이터가 없어요.
          </Text>
          <Text size="md" color={theme.textDim}>
            조금만 기다려주세요!
          </Text>
        </View>
      ) : (
        <VictoryChart width={width} height={height}>
          {/* Bar chart */}
          <VictoryBar
            data={data}
            style={{
              data: {
                fill: fillCondition,
              },
              labels: { fill: theme.text },
            }}
            labels={barLabels} // 막대 위에 표시할 라벨
          />

          {/* X-axis */}
          <VictoryAxis
            tickValues={[1, 2]}
            // tickFormat={["", "me", "average", ""]}
            tickFormat={tickFormat}
            style={{
              axis: { stroke: theme.textDimmer, strokeWidth: 1 },
              ticks: { stroke: "transparent" },
              tickLabels: { fontSize: 12, padding: 5, fill: theme.text },
            }}
          />

          {/* Y-axis */}
          {/* <VictoryAxis dependentAxis /> */}

          {/* Percentage labels above the bars */}
        </VictoryChart>
      )}
    </View>
  );
};

export default MarketAverageGraph;
