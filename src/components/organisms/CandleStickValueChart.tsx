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
  typeIndex,
}: {
  width: number;
  height: number;
  data: Value[];
  theme: DefaultTheme;
  typeIndex: number;
}) {
  const maxY = Math.max(...data.map((item) => parseInt(item.high)));
  const minY = Math.min(...data.map((item) => parseInt(item.low)));
  const twoThirds = minY + ((maxY - minY) * 2) / 3;
  const oneThird = minY + ((maxY - minY) * 1) / 3;

  // 1주일 때 candleWidth는 width/7이지만 gap을 고려하여 넉넉히 20으로 설정. 나머지 typeIndex도 마찬가지로 설정
  // 꼬리 너비는 데이터 양이 많아질수록 줄어들게 설정
  let candleWidth;
  let wickStrokeWidth;
  switch (typeIndex) {
    case 0:
      candleWidth = width / 20;
      wickStrokeWidth = 1;
      break;
    case 1:
      candleWidth = width / 50;
      wickStrokeWidth = 1;
      break;
    case 2:
      candleWidth = width / 130;
      wickStrokeWidth = 0.8;
      break;
    default:
      candleWidth = width / 365;
      wickStrokeWidth = 0.5;
      break;
  }

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
        candleWidth={candleWidth}
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
        wickStrokeWidth={wickStrokeWidth}
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
