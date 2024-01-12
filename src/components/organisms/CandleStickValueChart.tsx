import React, { memo } from "react";
import {
  VictoryAxis,
  VictoryCandlestick,
  VictoryChart,
  VictoryContainer,
  VictoryZoomContainer,
} from "victory-native";
import { DefaultTheme } from "styled-components/native";
import { Value } from "../../@types/chart";
import dayjs from "dayjs";
import { createRestDummyData } from "../../utils/createRestDummyData";
import convertUTCToLocal from "../../utils/convertUTCtoLocal";

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
  let candleWidth = width / 60;
  let wickStrokeWidth = 1;
  let candleData: {
    open: number;
    close: number;
    high: number;
    low: number;
    x: Date;
  }[];

  if (data.length === 0) return <></>;

  let temp_full_data: Value[];

  if (data.length < 30) {
    temp_full_data = createRestDummyData(data, 30 - data.length);
  } else {
    temp_full_data = data;
  }

  candleData = temp_full_data.map((item) => ({
    open: item.start,
    close: item.end,
    high: item.high,
    low: item.low,
    x: new Date(convertUTCToLocal(item.date)),
  }));

  const maxY = Math.max(...candleData.map((item) => item.high));
  const minY = Math.min(...candleData.map((item) => item.low));
  const twoThirds = minY + ((maxY - minY) * 2) / 3;
  const oneThird = minY + ((maxY - minY) * 1) / 3;

  const firstDateMinusOneDay = dayjs(candleData[0].x)
    .subtract(1, "day")
    .toDate();
  const lastDatePlusOneDay = dayjs(candleData[candleData.length - 1].x)
    .add(1, "day")
    .toDate();

  return (
    <VictoryChart
      width={width}
      height={height}
      padding={{
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
      }}
      containerComponent={
        <VictoryZoomContainer zoomDimension="x"></VictoryZoomContainer>
      }
    >
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
      <VictoryCandlestick
        domain={{
          x: [firstDateMinusOneDay, lastDatePlusOneDay],
          y: [minY, maxY],
        }}
        animate={{
          duration: 1000,
        }}
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
    </VictoryChart>
  );
}

export default memo(CandleStickValueChart);
