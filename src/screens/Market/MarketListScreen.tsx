import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Image, ScrollView, View } from "react-native";
import styled, { useTheme } from "styled-components/native";
import LightLogo from "../../../assets/images/logo-dark.png";
import ContentLayout from "../../components/atoms/ContentLayout";
import CustomSkeleton from "../../components/atoms/CustomSkeleton";
import FlexBox from "../../components/atoms/FlexBox";
import Margin from "../../components/atoms/Margin";
import Text from "../../components/atoms/Text";
import { AbsolutePageHeader } from "../../components/molecules/PageHeader";
import { SearchBar2 } from "../../components/molecules/SearchBar";
import { MarketItemButton } from "../../components/organisms/Market/MarketButton";
import { WishListButton } from "../../components/organisms/Market/WishListBtn";
import { spacing } from "../../constants/spacing";
import { upValue } from "../../constants/value";
import { MarketStackParamList } from "../../navigators/MarketStack";
import { useGetAllStocksQuery } from "../../store/modules/market/market";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import marketListBanner from "../../../assets/images/marketTabListBanner.png";
import {
  ShadowForStockItem,
  ShadowForStockItem2,
} from "../../components/atoms/CustomShadow";

const PageHeaderBox = styled.View`
  height: ${useResponsiveFontSize(300)}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const PageInnerBox = styled.View`
  background-color: ${({ theme }) => theme.box};
  padding: 5px 20px;
  border-radius: 20px;
`;

const RegularSizeText = styled.Text<{
  color?: string;
}>`
  font-size: ${useResponsiveFontSize(13)}px;
  color: ${({ color, theme }) => color || theme.text};
`;

const MarketListItemInner = styled.View`
  flex: 1;
  padding: 1px 2px;
`;

const MarketListItem = ({
  id,
  name,
  participants,
  price,
  onPress,
}: {
  id: number;
  name: string;
  participants: number;
  price: number;
  onPress: () => void;
}) => {
  const theme = useTheme();

  return (
    <ShadowForStockItem2 radius={20}>
      <MarketItemButton onPress={onPress}>
        <MarketListItemInner>
          <FlexBox
            direction="column"
            justifyContent="space-between"
            alignItems="stretch"
            styles={{ flex: 1 }}
          >
            <Text size="md" weight={"extraBold"}>
              {name}
            </Text>
            <FlexBox justifyContent="space-between" alignItems="flex-end">
              <Text size="md" weight="medium">
                {price.toLocaleString()}원
              </Text>
              <RegularSizeText>
                오늘{" "}
                <RegularSizeText color={theme.palette.red}>
                  {participants.toLocaleString()}명
                </RegularSizeText>
                이 실천중🔥
              </RegularSizeText>
            </FlexBox>
          </FlexBox>
        </MarketListItemInner>
      </MarketItemButton>
    </ShadowForStockItem2>
  );
};

export default function MarketListScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<MarketStackParamList>>();

  const [searchText, setSearchText] = React.useState("");

  const { data, error, isLoading, isError } = useGetAllStocksQuery();

  const list = data?.stockitems;

  const filteredList = list?.filter((item) => {
    if (searchText === "") {
      return true;
    }
    return item.name.includes(searchText);
  });

  const theme = useTheme();

  const onPressListItem = (id: number) => {
    navigation.navigate("StockDetailScreen", {
      stockId: id,
    });
  };

  const onPressWishListButton = () => {
    navigation.navigate("WishListScreen");
  };

  const onPressSearchIcon = () => {
    console.log("search");
    setSearchText("");
  };

  const [isPageHeaderColorReverse, setIsPageHeaderColorReverse] =
    useState(true);

  return (
    <>
      <AbsolutePageHeader
        headerLeftColorReverse={
          theme.name === "gray" ? isPageHeaderColorReverse : false
        }
      />
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.background }}
        contentContainerStyle={{ paddingBottom: 100 }}
        onScroll={(e) => {
          if (e.nativeEvent.contentOffset.y > 100) {
            setIsPageHeaderColorReverse(false);
          } else {
            setIsPageHeaderColorReverse(true);
          }
        }}
        scrollEventThrottle={16}
      >
        <PageHeaderBox>
          <Image
            source={marketListBanner}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          ></Image>
          <Image
            resizeMode="contain"
            source={LightLogo}
            style={{
              width: "40%",
            }}
          />
          <PageInnerBox>
            <Text size="md"># 실천 종목 리스트</Text>
          </PageInnerBox>
        </PageHeaderBox>
        <Margin margin={spacing.small}></Margin>
        <ContentLayout>
          <SearchBar2
            text={searchText}
            onChangeText={(text) => setSearchText(text)}
            onPressSearchIcon={onPressSearchIcon}
            placeholder="종목명을 검색하세요."
          ></SearchBar2>
          <Margin margin={spacing.padding}></Margin>
          {/* {isLoading || isError ? (
            <CustomSkeleton>
              <View
                style={{
                  width: 30,
                  height: 10,
                  borderRadius: 10,
                }}
              ></View>
            </CustomSkeleton>
          ) : (
            <TextWithIcon text="필터">
              <WithLocalSvg
                asset={require("../../../assets/icons/filterIcon.svg")}
                fill={theme.text}
              />
            </TextWithIcon>
          )} */}
          <Margin margin={spacing.padding}></Margin>
          <FlexBox
            direction="column"
            alignItems="stretch"
            gap={spacing.padding + spacing.small}
          >
            {!isLoading && filteredList ? (
              filteredList.length !== 0 ? (
                filteredList.map((item, idx) => {
                  if (idx % 10 == 0 && idx != 0) {
                    return (
                      <View key={item.stockitem_id}>
                        <MarketListItem
                          id={item.stockitem_id}
                          name={item.name}
                          participants={item.take_count}
                          price={item.level * upValue}
                          onPress={() => onPressListItem(item.stockitem_id)}
                        />
                        <Margin
                          margin={spacing.padding + spacing.small}
                        ></Margin>
                        <WishListButton onPress={onPressWishListButton} />
                      </View>
                    );
                  }
                  return (
                    <View key={item.stockitem_id}>
                      <MarketListItem
                        id={item.stockitem_id}
                        name={item.name}
                        participants={item.take_count}
                        price={item.level * upValue}
                        onPress={() => onPressListItem(item.stockitem_id)}
                      />
                    </View>
                  );
                })
              ) : (
                <Text
                  size="md"
                  color={theme.textDim}
                  styles={{ textAlign: "center", paddingTop: 50 }}
                >
                  종목이 없습니다.
                </Text>
              )
            ) : (
              <>
                {[1, 2, 3].map((id) => (
                  <CustomSkeleton key={"marketListskel" + id}>
                    <View
                      style={{
                        width: "100%",
                        height: 95,
                        borderRadius: 10,
                      }}
                    ></View>
                  </CustomSkeleton>
                ))}
              </>
            )}
          </FlexBox>
        </ContentLayout>
      </ScrollView>
    </>
  );
}
