import React, { useContext, useEffect, useState } from "react";

import { Animated, Pressable } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { Value } from "../../@types/chart";
import FlexBox from "../atoms/FlexBox";
import LoadingSpinner from "../atoms/LoadingSpinner";
import Text from "../atoms/Text";
import CandleStickValueChart from "./CandleStickValueChart";
import LineValueChart from "./LineValueChart";
import { createMockData } from "../../utils/createMockData";
import CenterLayout from "../atoms/CenterLayout";
import dayjs from "dayjs";
import { useAppSelect } from "../../store/configureStore.hooks";
import useValue from "../../hooks/useValue";
import WagmeChart from "./WagmiChart";

const Container = styled.View`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
`;

const GraphContainer = styled.View`
  width: 100%;
  flex: 1;
`;

const dataArray = [
  {
    close: "8.65",
    high: "11.02",
    low: "7.16",
    open: "9.60",
    x: "2016-05-31T15:00:00.000Z",
  },
  {
    close: "9.28",
    high: "9.88",
    low: "7.90",
    open: "9.48",
    x: "2016-06-01T15:00:00.000Z",
  },
  {
    close: "9.42",
    high: "9.96",
    low: "7.37",
    open: "8.51",
    x: "2016-06-02T15:00:00.000Z",
  },
  {
    close: "8.67",
    high: "9.15",
    low: "7.18",
    open: "8.42",
    x: "2016-06-03T15:00:00.000Z",
  },
  {
    close: "9.13",
    high: "10.58",
    low: "0",
    open: "8.93",
    x: "2016-06-04T15:00:00.000Z",
  },
  {
    close: "8.43",
    high: "10.47",
    low: "6.48",
    open: "8.63",
    x: "2016-06-05T15:00:00.000Z",
  },
  {
    close: "7.99",
    high: "9.94",
    low: "7.91",
    open: "8.28",
    x: "2016-06-06T15:00:00.000Z",
  },
  {
    close: "8.95",
    high: "10.29",
    low: "8.44",
    open: "8.60",
    x: "2016-06-07T15:00:00.000Z",
  },
  {
    close: "7.64",
    high: "10.02",
    low: "6.19",
    open: "8.50",
    x: "2016-06-08T15:00:00.000Z",
  },
  {
    close: "8.69",
    high: "10.36",
    low: "7.65",
    open: "8.54",
    x: "2016-06-09T15:00:00.000Z",
  },
  {
    close: "10.06",
    high: "10.41",
    low: "9.34",
    open: "9.69",
    x: "2016-06-10T15:00:00.000Z",
  },
  {
    close: "9.82",
    high: "12.27",
    low: "9.17",
    open: "10.55",
    x: "2016-06-11T15:00:00.000Z",
  },
  {
    close: "9.52",
    high: "10.25",
    low: "9.18",
    open: "9.63",
    x: "2016-06-12T15:00:00.000Z",
  },
  {
    close: "9.84",
    high: "11.06",
    low: "8.77",
    open: "10.08",
    x: "2016-06-13T15:00:00.000Z",
  },
  {
    close: "9.94",
    high: "10.49",
    low: "9.90",
    open: "10.09",
    x: "2016-06-14T15:00:00.000Z",
  },
  {
    close: "9.84",
    high: "10.34",
    low: "9.08",
    open: "9.46",
    x: "2016-06-15T15:00:00.000Z",
  },
  {
    close: "10.20",
    high: "12.30",
    low: "9.73",
    open: "10.88",
    x: "2016-06-16T15:00:00.000Z",
  },
  {
    close: "10.81",
    high: "12.07",
    low: "9.19",
    open: "10.86",
    x: "2016-06-17T15:00:00.000Z",
  },
  {
    close: "11.98",
    high: "13.59",
    low: "10.99",
    open: "11.23",
    x: "2016-06-18T15:00:00.000Z",
  },
  {
    close: "10.68",
    high: "12.24",
    low: "9.53",
    open: "10.86",
    x: "2016-06-19T15:00:00.000Z",
  },
];

export const chartDateType = [
  {
    name: "1주",
    counts: 7,
  },
  {
    name: "1달",
    counts: 30,
  },
  {
    name: "3달",
    counts: 90,
  },
  {
    name: "1년",
    counts: 365,
  },
];

function HomeChart({ isCandleStick }: { isCandleStick: boolean }) {
  const themeContext = useContext(ThemeContext);
  const [index, setIndex] = React.useState(1);
  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const { data, isLoading, isError, error, refetch } = useValue();

  console.log(data);

  if (isError) console.log(error);

  return (
    <Container>
      <GraphContainer
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setContainerSize({
            width,
            height,
          });
        }}
      >
        {containerSize && !isLoading ? (
          !error ? (
            isCandleStick ? (
              <WagmeChart></WagmeChart>
            ) : (
              // <CandleStickValueChart
              //   height={containerSize.height}
              //   width={containerSize.width}
              //   data={data}
              //   theme={themeContext}
              // ></CandleStickValueChart>
              <LineValueChart
                height={containerSize.height}
                width={containerSize.width}
                data={data}
                maxLength={chartDateType[index].counts}
              ></LineValueChart>
            )
          ) : (
            <CenterLayout>
              <Text size="md">에러가 발생했습니다.</Text>
              <Pressable onPress={refetch}>
                <Text size="md">다시 시도해주세요.</Text>
              </Pressable>
            </CenterLayout>
          )
        ) : (
          <FlexBox
            justifyContent="center"
            alignItems="center"
            styles={{ flex: 1 }}
          >
            <LoadingSpinner />
          </FlexBox>
        )}
      </GraphContainer>
      {/* <BottomController
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          bottomControllerWidth.current = width;
        }}
      >
        <Animated.View
          style={{
            position: "absolute",
            width: "20%",
            height: "100%",
            backgroundColor: themeContext.background,
            borderRadius: 8,
            left: leftValue.current,
            top: BottomControllerPaddingVertical,
          }}
        ></Animated.View>
        {chartDateType.map((item, index) => (
          <BottomControllerItem key={item.name}>
            <Pressable
              onPress={() => {
                setIndex(index);
                moveBtnBackground(index);
                // mockApiCall(item.name, index);
              }}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text size="xs">{item.name}</Text>
            </Pressable>
          </BottomControllerItem>
        ))}
        <BottomControllerItem>
          <Pressable
            onPress={() => {
              setIsCandleStick(!isCandleStick);
            }}
          >
            {isCandleStick ? (
              <WithLocalSvg width={18} height={18} asset={LineChartIcon} />
            ) : (
              <WithLocalSvg width={18} height={18} asset={CandleStickIcon} />
            )}
          </Pressable>
        </BottomControllerItem>
      </BottomController> */}
    </Container>
  );
}

export default HomeChart;
