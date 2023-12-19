import React, { useContext } from "react";
import {
  VictoryAxis,
  VictoryCandlestick,
  VictoryChart,
  VictoryContainer,
} from "victory-native";
import styled, { ThemeContext } from "styled-components/native";
import { Pressable, View } from "react-native";
import { Animated } from "react-native";
import { palette } from "../../constants/colors";
import Text from "../atoms/Text";

const BottomControllerPaddingHorizontal = 26;
const BottomControllerPaddingVertical = 15;

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

const BottomController = styled.View`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: ${BottomControllerPaddingVertical}px
    ${BottomControllerPaddingHorizontal}px;
`;

const BottomControllerItem = styled.View`
  flex: 1;
  height: 35px;
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;
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

const createMockData = () => {
  const data_12 = [];
  let initialValue = 10;

  for (let i = 1; i <= 30; i++) {
    const date = new Date(2016, 5, i); // Months start from 0, so June is 5

    // Simulate stock-like movement with slight variations
    const fluctuation = Math.random() * 3 - 1.5; // Random variation between -1.5 and 1.5
    const open = initialValue + fluctuation;
    const close = open + Math.random() * 2 - 1; // Random small change
    const high = Math.max(open, close) + Math.random() * 2;
    const low = Math.min(open, close) - Math.random() * 2;

    // Prepare new data point
    const newDataPoint = {
      x: date, // Date
      open: open.toFixed(2), // Limit decimals to 2 places
      close: close.toFixed(2),
      high: high.toFixed(2),
      low: low.toFixed(2),
    };

    // Update initial value for the next day based on the previous day's close
    initialValue = parseFloat(newDataPoint.close);

    // Add new data point to the data array
    data_12.push(newDataPoint);
  }

  return data_12;
};

// FIXME: value 개수가 30개를 넘어갈때의 최적화 문제.

function CandleStickChart() {
  const themeContext = useContext(ThemeContext);
  const bottomControllerWidth = React.useRef(0);
  const bottomControllerItemWidth =
    (bottomControllerWidth.current - BottomControllerPaddingHorizontal * 2) / 5;

  const [data, setData] = React.useState(dataArray);
  const [isGraphReady, setIsGraphReady] = React.useState(false);

  const changeChartView = (index: number) => {
    const newLeftValue =
      index * bottomControllerItemWidth + BottomControllerPaddingHorizontal;

    Animated.timing(leftValue.current, {
      toValue: newLeftValue,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const ContainerSize = React.useRef({
    width: 0,
    height: 0,
  });

  const leftValue = React.useRef(
    new Animated.Value(BottomControllerPaddingHorizontal)
  );
  const ControllerHeight = React.useRef(0);

  const maxY = Math.max(...data.map((item) => parseInt(item.high)));
  const minY = Math.min(...data.map((item) => parseInt(item.low)));
  const twoThirds = minY + ((maxY - minY) * 2) / 3;
  const oneThird = minY + ((maxY - minY) * 1) / 3;

  return (
    <Container>
      <GraphContainer
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          ContainerSize.current = {
            width,
            height,
          };
          setIsGraphReady(true);
        }}
      >
        {isGraphReady && (
          <VictoryChart
            width={ContainerSize.current.width}
            height={ContainerSize.current.height}
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
              animate={{
                duration: 1000,
                onLoad: { duration: 1000 },
              }}
              candleWidth={5}
              containerComponent={<VictoryContainer responsive={false} />}
              candleColors={{
                positive: themeContext.high,
                negative: themeContext.low,
              }}
              style={{
                data: {
                  stroke: themeContext.palette.neutral600_gray,
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
                  stroke: themeContext.palette.neutral500_gray,
                  // strokeDasharray: [5, 5],
                },
              }}
            />
          </VictoryChart>
        )}
      </GraphContainer>
      <BottomController
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;

          bottomControllerWidth.current = width;
          ControllerHeight.current = height;
        }}
      >
        <Animated.View
          style={{
            position: "absolute",
            width: "20%",
            height: "100%",
            backgroundColor: palette.neutral300_gray,
            borderRadius: 8,
            left: leftValue.current,
            top: BottomControllerPaddingVertical,
          }}
        ></Animated.View>
        {["일", "주", "월", "년"].map((item, index) => (
          <BottomControllerItem>
            <Pressable
              onPress={() => {
                changeChartView(index);
                setData(createMockData());
              }}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text size="xs">{item}</Text>
            </Pressable>
          </BottomControllerItem>
        ))}
        <BottomControllerItem>
          <Text size="xs">그래프</Text>
        </BottomControllerItem>
      </BottomController>
    </Container>
  );
}

export default CandleStickChart;
