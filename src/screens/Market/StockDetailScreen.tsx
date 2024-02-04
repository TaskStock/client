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
import GradientOverlay from "../../components/atoms/GradientOverlay";
import StockDetailGraphSection from "../../components/organisms/Market/StockDetailGraphSection";
import { useTheme } from "styled-components/native";
import {
  useAddStockToMyListMutation,
  useGetStockDetailsQuery,
} from "../../store/modules/market/market";
import CustomSkeleton from "../../components/atoms/CustomSkeleton";

export default function StockDetailScreen() {
  const graphHeight = Dimensions.get("screen").height * 0.3;

  const theme = useTheme();

  const { data, isLoading, isError } = useGetStockDetailsQuery(1);

  const [addStock] = useAddStockToMyListMutation();

  const onPressAddStock = () => {
    addStock({ stockId: 1 });
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <PageHeader />
      <ContentLayout>
        <ScrollView style={{ flex: 1 }}>
          {!isLoading && data ? (
            <>
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
          {!isLoading && data ? (
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
          {!isLoading && data ? (
            <BlackBtnForProject text="투자하기" onPress={onPressAddStock} />
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
              {!isLoading && data ? (
                <>
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
                7%
              </Text>
              높아요
            </Text>
            <Margin margin={spacing.padding} />
            <StockDetailGraphSection />
          </FlexBox>
        </ScrollView>
      </ContentLayout>
    </View>
  );
}
