import { Pressable, ScrollView, View } from "react-native";
import React from "react";
import { MarketSection } from "../../components/molecules/Section";
import ContentLayout from "../../components/atoms/ContentLayout";
import styled, { useTheme } from "styled-components/native";
import Margin from "../../components/atoms/Margin";
import { spacing } from "../../constants/spacing";
import ContentItemBox, {
  ContentItemBoxContainer,
} from "../../components/atoms/ContentItemBox";
import FlexBox from "../../components/atoms/FlexBox";
import Icons from "../../components/atoms/Icons";
import Text from "../../components/atoms/Text";
import { useNavigation } from "@react-navigation/native";
import { MarketStackParamList } from "../../navigators/MarketStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { WishListButton } from "../../components/organisms/Market/WishListBtn";
import {
  StockItem,
  StockItemSecond,
} from "../../components/organisms/Market/StockItem";
import { useGetCategorizedStocksQuery } from "../../store/modules/market/market";
import CenterLayout from "../../components/atoms/CenterLayout";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import CustomSkeleton from "../../components/atoms/CustomSkeleton";

const MainRectangle = styled.View`
  width: 100%;
  padding-bottom: 100%;
  background-color: ${({ theme }) =>
    theme.name == "dark" ? "#2E2E2E" : theme.palette.neutral400_gray};
`;

const FloatTitle = styled.Pressable`
  width: 100%;
  position: absolute;
  top: -35px;
  z-index: 2;
  justify-content: center;
  align-items: center;
`;

const InnerFloat = styled.View`
  width: 80%;
`;

const mockdata = [
  {
    id: 1,
    name: "삼성전자 만약에 이렇게 길어진다면 어떻게 할건지 생각을",
    percent: 21,
    price: 100000,
  },
  {
    id: 2,
    name: "삼성전자",
    percent: 21,
    price: 100000,
  },
  {
    id: 3,
    name: "삼성전자",
    percent: 21,
    price: 100000,
  },
  {
    id: 4,
    name: "삼성전자",
    percent: 21,
    price: 100000,
  },
  {
    id: 5,
    name: "삼성전자",
    percent: 21,
    price: 100000,
  },
];

export default function MarketMainScreen() {
  const theme = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<MarketStackParamList>>();

  const onPressCheckStockList = () => {
    navigation.navigate("MarketListScreen");
  };

  const onPressStockItem = (id: number) => {
    navigation.navigate("StockDetailScreen", {
      stockId: id,
    });
  };

  const onPressWishList = () => {
    navigation.navigate("WishListScreen");
  };

  const { data, isError, isLoading } = useGetCategorizedStocksQuery({});

  // if (isError)
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //       }}
  //     >
  //       <CenterLayout>
  //         <Text size="md">Error</Text>
  //       </CenterLayout>
  //     </View>
  //   );

  const section1Data = data;
  const section2Data = data;
  const section3Data = data;

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <MainRectangle />
        <View>
          <FloatTitle>
            <InnerFloat>
              <Pressable onPress={onPressCheckStockList}>
                <ContentItemBox>
                  <FlexBox
                    alignItems="center"
                    justifyContent="space-between"
                    styles={{
                      paddingHorizontal: spacing.small,
                    }}
                  >
                    <View>
                      <Text size="xs" color={theme.palette.red}>
                        갓생 도전!!
                      </Text>
                      <Margin margin={5}></Margin>
                      <Text size="xl" weight="bold">
                        장 종목 확인하기
                      </Text>
                    </View>
                    <Icons
                      type="material"
                      name="chevron-right"
                      size={30}
                      color={theme.textDim}
                    />
                  </FlexBox>
                </ContentItemBox>
              </Pressable>
            </InnerFloat>
          </FloatTitle>
          <View style={{ flex: 1, backgroundColor: theme.background }}>
            <Margin margin={60}></Margin>
            <ContentLayout>
              <FlexBox
                direction="column"
                alignItems="stretch"
                gap={spacing.gutter + spacing.offset}
                styles={{
                  flex: 1,
                }}
              >
                <MarketSection
                  headerText="나의 관심 종목"
                  subText="장준석님이 자주 추가하는 종목이에요"
                >
                  <ScrollView
                    horizontal
                    contentContainerStyle={{
                      columnGap: spacing.padding + spacing.small,
                      paddingBottom: spacing.offset,
                    }}
                    style={{
                      flexGrow: 0,
                    }}
                  >
                    {section1Data ? (
                      section1Data.map((item) => (
                        <StockItem
                          id={item.id}
                          name={item.name}
                          percent={item.percent}
                          price={item.price}
                          onPress={() => {
                            onPressStockItem(item.id);
                          }}
                        ></StockItem>
                      ))
                    ) : (
                      <>
                        {[1, 2, 3].map((id) => (
                          <CustomSkeleton key={"skel" + id}>
                            <View
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: 10,
                              }}
                            ></View>
                          </CustomSkeleton>
                        ))}
                      </>
                    )}
                  </ScrollView>
                </MarketSection>
                <MarketSection
                  headerText="오늘의 인기 종목"
                  subText="오늘 사람들이 많이 추가한 종목이에요"
                >
                  <FlexBox direction={"column"} alignItems="stretch" gap={10}>
                    {section2Data ? (
                      section2Data.map((item, index) => (
                        <StockItemSecond
                          id={item.id}
                          index={index}
                          name={item.name}
                          percent={item.percent}
                          onPress={() => {
                            onPressStockItem(item.id);
                          }}
                        ></StockItemSecond>
                      ))
                    ) : (
                      <>
                        {[1, 2, 3].map((id) => (
                          <CustomSkeleton key={"skel" + id}>
                            <View
                              style={{
                                width: "100%",
                                height: 30,
                                borderRadius: 10,
                              }}
                            ></View>
                          </CustomSkeleton>
                        ))}
                      </>
                    )}
                  </FlexBox>
                  <Margin margin={spacing.offset}></Margin>
                </MarketSection>
                <MarketSection
                  headerText="오늘의 추천 종목"
                  subText="오늘 이 종목 어때요?"
                >
                  <ScrollView
                    horizontal
                    contentContainerStyle={{
                      columnGap: spacing.padding + spacing.small,
                      paddingBottom: spacing.offset,
                    }}
                    style={{
                      flexGrow: 0,
                    }}
                  >
                    {section1Data ? (
                      section1Data.map((item) => (
                        <StockItem
                          id={item.id}
                          name={item.name}
                          percent={item.percent}
                          price={item.price}
                          onPress={() => {
                            onPressStockItem(item.id);
                          }}
                        ></StockItem>
                      ))
                    ) : (
                      <>
                        {[1, 2, 3].map((id) => (
                          <CustomSkeleton key={"skel" + id}>
                            <View
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: 10,
                              }}
                            ></View>
                          </CustomSkeleton>
                        ))}
                      </>
                    )}
                  </ScrollView>
                </MarketSection>
                <WishListButton onPress={onPressWishList} />
              </FlexBox>
            </ContentLayout>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
