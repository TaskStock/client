import { Dimensions, ScrollView, View } from "react-native";
import React from "react";
import PageHeader from "../../components/molecules/PageHeader";
import ContentLayout from "../../components/atoms/ContentLayout";
import Section from "../../components/molecules/Section";
import HomeChart from "../../components/organisms/Home/HomeChart";
import Margin from "../../components/atoms/Margin";
import { spacing } from "../../constants/spacing";
import { BlackBtnForProject } from "../../components/atoms/Buttons";
import FlexBox from "../../components/atoms/FlexBox";
import Text from "../../components/atoms/Text";
import Divider from "../../components/atoms/Divider";
import styled, { useTheme } from "styled-components/native";
import { ContentItemBoxContainer } from "../../components/atoms/ContentItemBox";
import GradientOverlay from "../../components/atoms/GradientOverlay";
import MeAndAverageGraph from "../../components/organisms/Market/MarketAverageGraph";
import dayjs from "dayjs";

const GraphBox = styled(ContentItemBoxContainer)`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function StockDetailScreen() {
  const graphHeight = Dimensions.get("screen").height * 0.3;

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
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <PageHeader />
      <ContentLayout>
        <ScrollView style={{ flex: 1 }}>
          <Section.HeaderText size={24} isMainText={true}>
            간지나게 숨쉬기
          </Section.HeaderText>
          <Section.HeaderText size={24} isMainText={true}>
            232,000원
          </Section.HeaderText>
          <Margin margin={spacing.small} />
          <Section.HeaderSubText size={15}>
            현재 132명이 투자중
          </Section.HeaderSubText>
          <Margin margin={spacing.padding} />
          <View style={{ height: graphHeight }}>
            <GradientOverlay />
            <View
              style={{
                padding: spacing.offset,
              }}
            >
              <HomeChart
                isCandleStick={false}
                value={{
                  data: [
                    {
                      date: "2021-08-01",
                      start: 1000,
                      end: 2000,
                      high: 3000,
                      low: 500,
                      percentage: 0.5,
                      value_id: 1,
                      combo: 0,
                    },
                  ],
                  isLoading: false,
                  error: null,
                  isError: false,
                  refetch: () => {},
                }}
              ></HomeChart>
            </View>
          </View>
          <Margin margin={spacing.offset} />
          <BlackBtnForProject text="투자하기" onPress={() => {}} />
          <Margin margin={spacing.gutter} />
          <FlexBox
            direction="column"
            alignItems="stretch"
            gap={spacing.padding}
          >
            <FlexBox
              direction="column"
              alignItems="stretch"
              gap={spacing.offset}
            >
              <Text size="md" weight="regular">
                ✋{"  "}하루 평균{" "}
                <Text size="md" weight="bold">
                  11명
                </Text>
                이 실천해요.
              </Text>
              <Text size="md" weight="regular">
                👍{"  "}나는 지금까지{" "}
                <Text size="md" weight="bold">
                  12회
                </Text>{" "}
                실천했어요.
              </Text>
              <Text size="md" weight="regular">
                ❤️{"  "}이 종목은 매주{" "}
                <Text size="md" weight="bold">
                  금요일
                </Text>
                에 인기가 많아요.
              </Text>
            </FlexBox>

            <Divider color={theme.textDimmer} marginVertical={20} />
            <Text size="xl" weight="regular">
              <Text size="xl" weight="bold">
                김땡땡님
              </Text>
              은 평균보다 달성률이
            </Text>
            <Text size="xl" weight="regular">
              <Text size="xl" weight="bold">
                7%
              </Text>
              높아요
            </Text>
            <Margin margin={spacing.padding} />
            <GraphBox
              onLayout={(e) => {
                const { width, height } = e.nativeEvent.layout;
                if (graphSize.width === width && graphSize.height === height)
                  return;
                setGraphSize({ width, height });
              }}
            >
              <MeAndAverageGraph
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
              <MeAndAverageGraph
                fillCondition={data2FillCondition}
                data={data2}
                size={graphSize}
              />
            </GraphBox>
          </FlexBox>
        </ScrollView>
      </ContentLayout>
    </View>
  );
}
