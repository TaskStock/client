import React, { useContext, useEffect, useState } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { Pressable } from "react-native";
import { Animated } from "react-native";
import Text from "../atoms/Text";
import { View } from "react-native";
import { WithLocalSvg } from "react-native-svg";
import LineChartIcon from "../../../assets/icons/lineChartIcon.svg";
import CandleStickIcon from "../../../assets/icons/CandleStickIcon.svg";
import CandleStickValueChart from "./CandleStickValueChart";
import LineValueChart from "./LineValueChart";

export interface Value {
  x: string;
  open: string;
  close: string;
  high: string;
  low: string;
}

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

const createMockData = (length: number): Value[] => {
  const data_12 = [];
  let initialValue = 10;

  for (let i = 1; i <= length; i++) {
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

const chartDateType = [
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

function HomeChart() {
  const themeContext = useContext(ThemeContext);

  // absolute하게 움직이는 뒷 버튼을 위함.
  const bottomControllerWidth = React.useRef(0);
  const bottomControllerItemWidth =
    (bottomControllerWidth.current - BottomControllerPaddingHorizontal * 2) / 5;

  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const leftValue = React.useRef(
    new Animated.Value(BottomControllerPaddingHorizontal)
  );

  const moveBtnBackground = (index: number) => {
    const newLeftValue =
      index * bottomControllerItemWidth + BottomControllerPaddingHorizontal;

    Animated.timing(leftValue.current, {
      toValue: newLeftValue,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const [data, setData] = React.useState(dataArray);
  const [isCandleStick, setIsCandleStick] = React.useState(true);

  // 원래 redux 안에 넣는게 좋지만, 나중에 RTK Query로 바꿀거라 그냥 여기에 넣음.
  const [loading, setLoading] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    mockApiCall(chartDateType[index].name);
  }, [index]);

  // 일단 임시로 넣었음. 1주, 1달, 3달, 1년 각각의 데이터를 일단 mock data로 생성하되,
  // 각 주별 데이터는 끝까지 채워진게 아니라, 좀 비워져있음.
  const mockApiCall = async (type) => {
    setLoading(true);
    const length = chartDateType.find((item) => item.name === type)?.counts;

    const randomFluctuation = Math.floor(Math.random() * length);

    const response = await new Promise<Value[]>((resolve, reject) => {
      setTimeout(() => {
        resolve(createMockData(length - randomFluctuation));
      }, 500);
    });

    if (length > response.length) {
      const newArray = [];

      const lastDate = new Date(response[response.length - 1].x);

      const sumValue = response.reduce((acc, cur) => {
        return acc + parseFloat(cur.close);
      }, 0);

      const avgValue = (sumValue / response.length).toFixed(2);

      for (let i = 1; i <= length - response.length; i++) {
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

      setData([...response, ...newArray]);
      setLoading(false);
    } else {
    }
  };

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
        {containerSize && !loading ? (
          isCandleStick ? (
            <CandleStickValueChart
              height={containerSize.height}
              width={containerSize.width}
              data={data}
              theme={themeContext}
              typeIndex={index}
            ></CandleStickValueChart>
          ) : (
            <LineValueChart></LineValueChart>
          )
        ) : (
          <View>
            <Text size="sm">loading...</Text>
          </View>
        )}
      </GraphContainer>
      <BottomController
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
      </BottomController>
    </Container>
  );
}

export default HomeChart;
