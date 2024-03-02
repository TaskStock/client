import { View } from "react-native";
import React from "react";
import styled, { useTheme } from "styled-components/native";
import dayjs from "dayjs";
import { ContentItemBoxContainer } from "../../atoms/ContentItemBox";
import MarketAverageGraph from "./MarketAverageGraph";
import Margin from "../../atoms/Margin";
import Text from "../../atoms/Text";
import { spacing } from "../../../constants/spacing";
import FlexBox from "../../atoms/FlexBox";
import useUser from "../../../hooks/useUser";

const GraphBox = styled(ContentItemBoxContainer)`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function StockDetailGraphSection({
  successRate: { mySuccessRate, averageSuccessRate, myTakeCount },
  weekdaySuccessCount: {
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  },
  diffRate,
}: {
  successRate: {
    mySuccessRate: number;
    averageSuccessRate: number;
    myTakeCount: number;
  };
  weekdaySuccessCount: {
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
    saturday: number;
    sunday: number;
  };
  diffRate: number;
}) {
  const theme = useTheme();

  const [graphSize, setGraphSize] = React.useState({
    width: 0,
    height: 0,
  });

  const data = [
    { x: "fake", y: 0, fake: true },
    { x: "나", y: mySuccessRate, fake: false },
    { x: "평균", y: averageSuccessRate, fake: false },
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

  let data2 = [
    {
      x: "월",
      y: monday,
    },
    {
      x: "화",
      y: tuesday,
    },
    {
      x: "수",
      y: wednesday,
    },
    {
      x: "목",
      y: thursday,
    },
    {
      x: "금",
      y: friday,
    },
    {
      x: "토",
      y: saturday,
    },
    {
      x: "일",
      y: sunday,
    },
  ];

  const {
    user: { user_name: username },
  } = useUser();

  const data2Max = Math.max(...data2.map((point) => point.y));

  const data2FillCondition = ({
    datum,
  }: {
    datum: { x: string; y: number };
  }) => {
    if (datum.y === data2Max) {
      return theme.palette.red;
    } else {
      return theme.textDimmer;
    }
  };

  // const maxDay = data2.find((point) => point.y === data2Max)?.x;

  const maxDays = data2
    .filter((point) => point.y === data2Max)
    .map((point) => point.x);

  const data1NoData = data.every((point) => point.y === 0);
  const data2NoData = data2.every((point) => point.y === 0);

  return (
    <>
      {!data1NoData ? (
        myTakeCount > 0 ? (
          diffRate !== 0 ? (
            <>
              <FlexBox
                direction="column"
                alignItems="stretch"
                gap={spacing.small}
              >
                <Text size="xl" weight="regular">
                  <Text size="xl" weight="bold">
                    {username}님
                  </Text>
                  은 평균보다 달성률이{" "}
                  <Text size="xl" weight="bold">
                    {Math.abs(diffRate)}%
                  </Text>
                  {diffRate > 0 ? " 높아요. 👏" : " 낮아요. 😥"}
                </Text>
              </FlexBox>
            </>
          ) : (
            <>
              <FlexBox
                direction="column"
                alignItems="stretch"
                gap={spacing.small}
              >
                <Text size="xl" weight="regular">
                  <Text size="xl" weight="bold">
                    {username}님
                  </Text>
                  은 평균과 달성률이
                </Text>
                <Text size="xl" weight="regular">
                  <Text size="xl" weight="bold">
                    같아요. 🤔
                  </Text>
                </Text>
              </FlexBox>
            </>
          )
        ) : (
          <FlexBox direction="column" alignItems="stretch" gap={spacing.small}>
            <Text size="xl" weight="regular">
              <Text size="xl" weight="bold">
                {username}님
              </Text>
              은 아직 첫 투자를 하지 않았어요.
            </Text>
          </FlexBox>
        )
      ) : (
        <Text size="xl" weight="regular">
          할 일을 완료해 이 종목의 첫 투자자가 되어보세요!
        </Text>
      )}

      <Margin margin={spacing.padding} />
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
          noData={data1NoData}
          labelType="percentage"
        />
      </GraphBox>
      <Margin margin={40} />
      {!data2NoData && (
        <>
          <FlexBox direction="column" alignItems="stretch" gap={spacing.small}>
            <Text size="xl" weight="regular">
              <Text size="xl" weight="bold">
                {maxDays.join(",")}요일
              </Text>
              에 사람들이
            </Text>
            <Text size="xl" weight="regular">
              가장 많이 실천해요
            </Text>
          </FlexBox>
          <Margin margin={spacing.padding} />
        </>
      )}

      <GraphBox>
        <MarketAverageGraph
          fillCondition={data2FillCondition}
          data={data2}
          size={graphSize}
          noData={data2NoData}
          labelType="people"
        />
      </GraphBox>
    </>
  );
}
