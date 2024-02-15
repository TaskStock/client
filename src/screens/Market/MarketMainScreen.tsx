import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import styled, { useTheme } from "styled-components/native";
import MarketBannerImage from "../../../assets/images/marketTabBanner.png";
import ContentItemBox from "../../components/atoms/ContentItemBox";
import ContentLayout from "../../components/atoms/ContentLayout";
import CustomSkeleton from "../../components/atoms/CustomSkeleton";
import FlexBox from "../../components/atoms/FlexBox";
import Icons from "../../components/atoms/Icons";
import Margin from "../../components/atoms/Margin";
import Text from "../../components/atoms/Text";
import { MarketSection } from "../../components/molecules/Section";
import {
  StockItem,
  StockItemSecond,
} from "../../components/organisms/Market/StockItem";
import { WishListButton } from "../../components/organisms/Market/WishListBtn";
import { spacing } from "../../constants/spacing";
import { upValue } from "../../constants/value";
import { MarketStackParamList } from "../../navigators/MarketStack";
import { useGetCategorizedStocksQuery } from "../../store/modules/market/market";
import { useAppSelect } from "../../store/configureStore.hooks";
import { ShadowForStockItem } from "../../components/atoms/CustomShadow";

const MainRectangle = styled.View`
  width: 100%;
  /* padding-bottom: 100%; */
  background-color: ${({ theme }) =>
    theme.name == "dark" ? "#2E2E2E" : theme.palette.neutral400_gray};
`;

const BannerFloatOverlay = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  justify-content: flex-end;
  align-items: center;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.33);
`;

const BannerFloatContainer = styled.View`
  position: absolute;
  width: 100%;
  top: 100px;
  right: ${spacing.gutter}px;
  /* justify-content: flex-end; */
  /* align-items: center; */
  align-items: flex-end;
  flex-direction: column;
  gap: 4px;

  z-index: 1;
`;

const BannerFloatTitle = styled.Text`
  font-family: "extraBold";
  font-size: 36px;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.neutral100_gray};
`;

const BannerFloatSubTitle = styled(BannerFloatTitle)`
  font-family: "medium";
  font-size: 36px;
  font-weight: bold;
`;

const FloatTitle = styled.Pressable`
  width: 100%;
  position: absolute;
  top: -35px;
  z-index: 20;
  justify-content: center;
  align-items: center;
  padding-left: ${spacing.gutter}px;
  padding-right: ${spacing.gutter}px;
`;

const InnerFloat = styled.View`
  width: 100%;
`;

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

  const { data, isError, isLoading, error } = useGetCategorizedStocksQuery();

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

  const section1Data = data?.myinterest;
  const section2Data = data?.todaypopular;
  const section3Data = data?.todayrecommend;

  const { user_name } = useAppSelect((state) => state.user.user);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            position: "relative",
            width: "100%",
            height: 400,
          }}
        >
          <Image
            source={MarketBannerImage}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          ></Image>
          <BannerFloatOverlay>
            <BannerFloatContainer>
              <Text
                size="md"
                weight="bold"
                color={theme.palette.neutral100_gray}
              >
                미라클 모닝 성공률은 어떻게 될까?
              </Text>
              <Margin margin={5}></Margin>
              <BannerFloatSubTitle>매일 도전하는</BannerFloatSubTitle>
              <BannerFloatTitle>데일리 종목</BannerFloatTitle>
            </BannerFloatContainer>
          </BannerFloatOverlay>
        </View>

        <View>
          <FloatTitle>
            <InnerFloat>
              <ShadowForStockItem>
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
              </ShadowForStockItem>
            </InnerFloat>
          </FloatTitle>

          <View style={{ flex: 1, backgroundColor: theme.background }}>
            <Margin margin={100}></Margin>
            <FlexBox
              direction="column"
              alignItems="stretch"
              gap={spacing.gutter + spacing.offset}
              styles={{
                flex: 1,
                paddingBottom: spacing.offset,
              }}
            >
              <MarketSection
                headerText="나의 관심 종목"
                subText={`${user_name}님이 자주 추가하는 종목이에요`}
              >
                <ScrollView
                  horizontal
                  contentContainerStyle={{
                    columnGap: spacing.padding + spacing.small,
                    paddingHorizontal: spacing.gutter,
                    paddingBottom: spacing.offset,
                    paddingTop: 3,
                  }}
                  style={{
                    flexGrow: 0,
                  }}
                >
                  {section1Data ? (
                    section1Data.map((item) => {
                      let value = (item.success_count / item.take_count) * 100;

                      let successRate = value ? value : 0;

                      return (
                        <View key={item.stockitem_id}>
                          <StockItem
                            id={item.stockitem_id}
                            name={item.name}
                            percent={successRate}
                            price={item.level * upValue}
                            onPress={() => {
                              onPressStockItem(item.stockitem_id);
                            }}
                          ></StockItem>
                        </View>
                      );
                    })
                  ) : (
                    <>
                      {[1, 2, 3].map((id) => (
                        <View key={"section1skel" + id}>
                          <CustomSkeleton>
                            <View
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: 10,
                              }}
                            ></View>
                          </CustomSkeleton>
                        </View>
                      ))}
                    </>
                  )}
                </ScrollView>
              </MarketSection>
              <MarketSection
                headerText="오늘의 인기 종목"
                subText="오늘 사람들이 많이 추가한 종목이에요"
              >
                <Margin margin={spacing.small}></Margin>
                <ContentLayout noVerticalPadding>
                  <FlexBox direction={"column"} alignItems="stretch" gap={10}>
                    {section2Data ? (
                      section2Data.map((item, index) => {
                        const value =
                          (item.success_count / item.take_count) * 100;
                        const successRate = value ? value : 0;

                        return (
                          <View key={item.stockitem_id}>
                            <StockItemSecond
                              id={item.stockitem_id}
                              index={index}
                              name={item.name}
                              percent={successRate}
                              onPress={() => {
                                onPressStockItem(item.stockitem_id);
                              }}
                            ></StockItemSecond>
                          </View>
                        );
                      })
                    ) : (
                      <>
                        {[1, 2, 3].map((id) => (
                          <View key={"section2skel" + id}>
                            <CustomSkeleton>
                              <View
                                style={{
                                  width: "100%",
                                  height: 30,
                                  borderRadius: 10,
                                }}
                              ></View>
                            </CustomSkeleton>
                          </View>
                        ))}
                      </>
                    )}
                  </FlexBox>
                  <Margin margin={spacing.offset}></Margin>
                </ContentLayout>
              </MarketSection>
              <MarketSection
                headerText="오늘의 추천 종목"
                subText="오늘 이 종목 어때요?"
              >
                <ScrollView
                  horizontal
                  contentContainerStyle={{
                    columnGap: spacing.padding + spacing.small,
                    paddingTop: 3,
                    paddingBottom: spacing.offset,
                    paddingHorizontal: spacing.gutter,
                  }}
                  style={{
                    flexGrow: 0,
                  }}
                >
                  {section3Data ? (
                    section3Data.map((item) => {
                      let value = (item.success_count / item.take_count) * 100;

                      let successRate = value ? value : 0;

                      return (
                        <View key={item.stockitem_id}>
                          <StockItem
                            id={item.stockitem_id}
                            name={item.name}
                            percent={successRate}
                            price={item.level * upValue}
                            onPress={() => {
                              onPressStockItem(item.stockitem_id);
                            }}
                          ></StockItem>
                        </View>
                      );
                    })
                  ) : (
                    <>
                      {[1, 2, 3].map((id) => (
                        <View key={"section3skel" + id}>
                          <CustomSkeleton>
                            <View
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: 10,
                              }}
                            ></View>
                          </CustomSkeleton>
                        </View>
                      ))}
                    </>
                  )}
                </ScrollView>
              </MarketSection>
              <ContentLayout noFlex noVerticalPadding>
                <WishListButton onPress={onPressWishList} />
              </ContentLayout>
            </FlexBox>
            {/* </ContentLayout> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
