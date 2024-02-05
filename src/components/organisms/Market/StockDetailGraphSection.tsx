import { View } from "react-native";
import React from "react";
import styled, { useTheme } from "styled-components/native";
import dayjs from "dayjs";
import { ContentItemBoxContainer } from "../../atoms/ContentItemBox";
import MarketAverageGraph from "./MarketAverageGraph";
import Margin from "../../atoms/Margin";
import Text from "../../atoms/Text";
import { spacing } from "../../../constants/spacing";

const GraphBox = styled(ContentItemBoxContainer)`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function StockDetailGraphSection() {
  const theme = useTheme();

  const [graphSize, setGraphSize] = React.useState({
    width: 0,
    height: 0,
  });

  const data = [
    { x: "fake", y: 0, fake: true },
    { x: "나", y: 80 },
    { x: "평균", y: 70 },
    { x: "fake123", y: 0, fake: true },
  ];

  const data1FillCondition = ({
    datum,
  }: {
    datum: { x: string; y: number };
  }) => {
    if (datum.x === "나") {
      return theme.palette.red;
    }
    return theme.textDimmer;
  };

  const now = dayjs();

  const currentDay = (() => {
    switch (now.day()) {
      case 0:
        return "일";
      case 1:
        return "월";
      case 2:
        return "화";
      case 3:
        return "수";
      case 4:
        return "목";
      case 5:
        return "금";
      case 6:
        return "토";
    }
  })();

  const data2FillCondition = ({
    datum,
  }: {
    datum: { x: string; y: number };
  }) => {
    if (datum.x === currentDay) {
      return theme.palette.red;
    } else {
      return theme.textDimmer;
    }
  };

  const data2 = [
    {
      x: "월",
      y: 32,
    },
    {
      x: "화",
      y: 40,
    },
    {
      x: "수",
      y: 50,
    },
    {
      x: "목",
      y: 60,
    },
    {
      x: "금",
      y: 70,
    },
    {
      x: "토",
      y: 80,
    },
    {
      x: "일",
      y: 90,
    },
  ];

  return (
    <>
      <GraphBox
        onLayout={(e) => {
          const { width, height } = e.nativeEvent.layout;
          if (graphSize.width === width && graphSize.height === height) return;
          setGraphSize({ width, height });
        }}
      >
        <MarketAverageGraph
          fillCondition={data1FillCondition}
          data={data}
          size={graphSize}
        />
      </GraphBox>
      <Margin margin={40} />
      <Text size="xl" weight="regular">
        <Text size="xl" weight="bold">
          금요일
        </Text>
        엔 사람들이
      </Text>
      <Text size="xl" weight="regular">
        가장 많이 실천해요
      </Text>
      <Margin margin={spacing.padding} />

      <GraphBox>
        <MarketAverageGraph
          fillCondition={data2FillCondition}
          data={data2}
          size={graphSize}
        />
      </GraphBox>
    </>
  );
}
