import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { useTheme } from "styled-components/native";
import { IsoString } from "../../@types/calendar";
import { BlackBtnForProject, GrayBtn } from "../../components/atoms/Buttons";
import ContentLayout from "../../components/atoms/ContentLayout";
import CustomSkeleton from "../../components/atoms/CustomSkeleton";
import Divider from "../../components/atoms/Divider";
import FlexBox from "../../components/atoms/FlexBox";
import GradientOverlay from "../../components/atoms/GradientOverlay";
import Margin from "../../components/atoms/Margin";
import Text from "../../components/atoms/Text";
import LineValueChart from "../../components/molecules/LineValueChart";
import PageHeader from "../../components/molecules/PageHeader";
import Section from "../../components/molecules/Section";
import StockDetailGraphSection from "../../components/organisms/Market/StockDetailGraphSection";
import { spacing } from "../../constants/spacing";
import { upValue } from "../../constants/value";
import { useGetAllTodoArgs } from "../../hooks/useGetAllTodoArgs";
import { useGetValuesArg } from "../../hooks/useGetValuesArg";
import { useStockDetail } from "../../hooks/useStockDetail";
import { MarketStackParamList } from "../../navigators/MarketStack";
import { useGetStockSuccessRateQuery } from "../../store/modules/market/market";
import { useAddTodoMutation } from "../../store/modules/todo/todo";
import analytics from "@react-native-firebase/analytics";

type StockDetailScreenProps = NativeStackScreenProps<
  MarketStackParamList,
  "StockDetailScreen"
>;

const createStockDetailChartData = (
  siValues: {
    success_rate: number;
    date: string;
  }[]
) => {
  return siValues.map((value) => {
    return {
      x: new Date(value.date).getTime(),
      end: value.success_rate !== 0 ? value.success_rate : 0.1,
    };
  });
};

export default function StockDetailScreen({
  navigation,
  route,
}: StockDetailScreenProps) {
  const graphHeight = Dimensions.get("screen").height * 0.3;

  if (route.params.stockId === undefined) {
    navigation.goBack();
  }

  const [graphSize, setGraphSize] = React.useState({
    width: 100,
    height: 100,
  });

  const {
    data,
    isLoading: isGraphLoading,
    isError: isGraphError,
  } = useGetStockSuccessRateQuery({
    stockitem_id: route.params.stockId,
  });

  const successRateData = data?.sivalues || [];
  const chartData = createStockDetailChartData(successRateData);

  const {
    info,
    stat,
    isLoading,
    average,
    maxValue,
    maxWeekday,
    diffRate,
    mySuccessRate,
    totalSuccessRate,
  } = useStockDetail(route.params.stockId);

  const [addTodo] = useAddTodoMutation();

  const theme = useTheme();

  const queryArg = useGetAllTodoArgs();
  const graphQueryArg = useGetValuesArg();

  const onPressAddStock = async () => {
    if (!info) return;

    addTodo({
      add_date: new Date().toISOString() as IsoString,
      stockitem_id: route.params.stockId,
      form: {
        content: info.name,
        level: info.level,
        project_id: null,
        todo_id: null,
        repeat_day: "0000000",
        repeat_end_date: null,
      },
      isHomeDrawerOpen: false,
      queryArgs: {
        date: queryArg.date,
        graph_before_date: graphQueryArg.startDate,
        graph_today_date: graphQueryArg.endDate,
      },
    });

    await analytics().logEvent("add_stock", {
      stockitem_id: route.params.stockId,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <PageHeader />
      <ContentLayout>
        <ScrollView style={{ flex: 1 }}>
          {!isLoading && info ? (
            <>
              <Section.HeaderText size={24} isMainText={true}>
                {info.name}
              </Section.HeaderText>
              <Section.HeaderText size={24} isMainText={true}>
                {info.level * upValue}원
              </Section.HeaderText>
              <Margin margin={spacing.small} />
              <Section.HeaderSubText size={15}>
                현재 {info.take_count}명이 투자중
              </Section.HeaderSubText>
            </>
          ) : (
            <>
              <CustomSkeleton>
                <View
                  style={{
                    width: "100%",
                    height: 50,
                    borderRadius: 10,
                    marginBottom: 10,
                  }}
                />
              </CustomSkeleton>
            </>
          )}
          <Margin margin={spacing.padding} />
          {!isLoading && info ? (
            <View style={{ height: graphHeight }}>
              <GradientOverlay />
              <View
                style={{
                  padding: spacing.offset,
                  flex: 1,
                }}
                onLayout={(event) => {
                  const { width, height } = event.nativeEvent.layout;

                  if (graphSize.width !== width || graphSize.height !== height)
                    setGraphSize({
                      width: width,
                      height: height,
                    });
                }}
              >
                <LineValueChart
                  data={chartData}
                  width={graphSize.width}
                  height={graphSize.height}
                />
              </View>
            </View>
          ) : (
            <CustomSkeleton>
              <View
                style={{
                  width: "100%",
                  height: graphHeight,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              />
            </CustomSkeleton>
          )}
          <Margin margin={spacing.offset} />
          {!isLoading && info ? (
            info.is_add_today ? (
              <GrayBtn text="오늘 할 일에 추가 완료" onPress={() => {}} />
            ) : (
              <BlackBtnForProject text="투자하기" onPress={onPressAddStock} />
            )
          ) : (
            <>
              <CustomSkeleton>
                <View
                  style={{
                    width: "100%",
                    height: 50,
                    borderRadius: 10,
                    marginBottom: 10,
                  }}
                />
              </CustomSkeleton>
            </>
          )}
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
              {!isLoading && info ? (
                <>
                  <Text size="md" weight="regular">
                    ✋{"  "}하루 평균{" "}
                    <Text size="md" weight="bold">
                      {average}명
                    </Text>
                    이 실천해요.
                  </Text>
                  <Text size="md" weight="regular">
                    👍{"  "}나는 지금까지{" "}
                    <Text size="md" weight="bold">
                      {info.my_success_count || 0}회
                    </Text>{" "}
                    실천했어요.
                  </Text>
                  <Text size="md" weight="regular">
                    ❤️{"  "}이 종목은 매주{" "}
                    <Text size="md" weight="bold">
                      {maxWeekday}
                    </Text>
                    에 인기가 많아요.
                  </Text>
                </>
              ) : (
                <>
                  {[1, 2, 3].map((_, index) => (
                    <View key={index + "textSkel"}>
                      <CustomSkeleton>
                        <View
                          key={index + "textSkel"}
                          style={{
                            width: "100%",
                            height: 30,
                            borderRadius: 10,
                            marginBottom: 10,
                          }}
                        />
                      </CustomSkeleton>
                    </View>
                  ))}
                </>
              )}
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
                {diffRate}%
              </Text>
              {diffRate > 0 ? " 높아요. 👏" : " 낮아요. 😥"}
            </Text>
            <Margin margin={spacing.padding} />
            <StockDetailGraphSection
              successRate={{
                mySuccessRate: mySuccessRate,
                averageSuccessRate: totalSuccessRate,
              }}
              weekdaySuccessCount={{
                monday: stat?.s_monday || 0,
                tuesday: stat?.s_tuesday || 0,
                wednesday: stat?.s_wednesday || 0,
                thursday: stat?.s_thursday || 0,
                friday: stat?.s_friday || 0,
                saturday: stat?.s_saturday || 0,
                sunday: stat?.s_sunday || 0,
              }}
            />
          </FlexBox>
        </ScrollView>
      </ContentLayout>
    </View>
  );
}
