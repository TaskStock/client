import React, { memo } from "react";
import {
  VictoryAxis,
  VictoryCandlestick,
  VictoryChart,
  VictoryContainer,
} from "victory-native";
import { chartDateType } from "./HomeChart";
import { DefaultTheme } from "styled-components/native";
import { Value } from "../../@types/chart";

const createDummyData = (arr: Value[], createLength: number): Value[] => {
  const newArray = [];

  const lastDate = new Date(arr[arr.length - 1].x);

  const sumValue = arr.reduce((acc, cur) => {
    return acc + parseFloat(cur.close);
  }, 0);

  const avgValue = (sumValue / arr.length).toFixed(2);

  for (let i = 1; i <= createLength; i++) {
    newArray.push({
      close: avgValue,
      high: avgValue,
      low: avgValue,
      open: avgValue,
      x: new Date(
        lastDate.getFullYear(),
        lastDate.getMonth(),
        lastDate.getDate() + i
      ),
    });
  }

  return [...arr, ...newArray];
};

function CandleStickValueChart({
  width,
  height,
  data,
  theme,
  typeIndex,
  maxLength,
}: {
  width: number;
  height: number;
  data: Value[];
  theme: DefaultTheme;
  typeIndex: number;
  maxLength: number;
}) {
  const maxY = Math.max(...data.map((item) => parseInt(item.high)));
  const minY = Math.min(...data.map((item) => parseInt(item.low)));
  const twoThirds = minY + ((maxY - minY) * 2) / 3;
  const oneThird = minY + ((maxY - minY) * 1) / 3;

  // 1주일 때 candleWidth는 width/7이지만 gap을 고려하여 넉넉히 20으로 설정. 나머지 typeIndex도 마찬가지로 설정
  // 꼬리 너비는 데이터 양이 많아질수록 줄어들게 설정
  let candleWidth;
  let wickStrokeWidth;
  let candleData = data;

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

  if (data.length < chartDateType[typeIndex].counts) {
    candleData = createDummyData(
      data,
      chartDateType[typeIndex].counts - data.length
    );
  } else {
    candleData = data;
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
        data={candleData}
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
