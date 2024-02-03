import { Image, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { SearchBar, SearchBar2 } from "../../components/molecules/SearchBar";
import ContentLayout from "../../components/atoms/ContentLayout";
import FlexBox from "../../components/atoms/FlexBox";
import { spacing } from "../../constants/spacing";
import Margin from "../../components/atoms/Margin";
import { AbsolutePageHeader } from "../../components/molecules/PageHeader";
import Text from "../../components/atoms/Text";
import { WishListButton } from "../../components/organisms/Market/WishListBtn";
import { TextWithIcon } from "../../components/molecules/TextWithIcon";
import { WithLocalSvg } from "react-native-svg";
import styled, { useTheme } from "styled-components/native";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import { useNavigation } from "@react-navigation/native";
import { MarketStackParamList } from "../../navigators/MarketStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import LightLogo from "../../../assets/images/logo-light.png";
import { MarketItemButton } from "../../components/organisms/Market/MarketButton";

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
  padding: 3px 2px;
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
    <MarketItemButton key={id} onPress={onPress}>
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
  );
};

export default function MarketListScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<MarketStackParamList>>();

  const [searchText, setSearchText] = React.useState("");

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

  return (
    <>
      <AbsolutePageHeader />
      <ScrollView style={{ flex: 1 }}>
        <PageHeaderBox>
          <Image
            source={{
              uri: "https://3.bp.blogspot.com/-J7WhLOq4UWg/WN9MLrsxZ_I/AAAAAAAAHrU/OksmOzSqxTwAij6o_p77nZBL_3GMA6ARACLcB/s1600/DSC_0185.JPG",
            }}
            style={{
              width: "100%",
              // height: "100%",
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
        <Margin margin={spacing.padding}></Margin>
        <ContentLayout>
          <SearchBar2
            text={searchText}
            onChangeText={(text) => setSearchText(text)}
            onPressSearchIcon={onPressSearchIcon}
            placeholder="종목명을 검색하세요."
          ></SearchBar2>
          <Margin margin={spacing.offset}></Margin>
          <TextWithIcon text="필터">
            <WithLocalSvg
              asset={require("../../../assets/icons/filterIcon.svg")}
            />
          </TextWithIcon>
          <Margin margin={spacing.padding}></Margin>
          <FlexBox
            direction="column"
            alignItems="stretch"
            gap={spacing.padding + spacing.small}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((id, idx) => {
              if (idx % 4 == 0 && idx != 0) {
                return (
                  <View key={id}>
                    <MarketListItem
                      id={id}
                      name="삼성전자"
                      participants={121}
                      price={100000}
                      onPress={() => onPressListItem(id)}
                    />
                    <Margin margin={spacing.padding + spacing.small}></Margin>
                    <WishListButton onPress={onPressWishListButton} />
                  </View>
                );
              }
              return (
                <MarketListItem
                  key={id}
                  id={id}
                  name="삼성전자"
                  participants={121}
                  price={100000}
                  onPress={() => onPressListItem(id)}
                />
              );
            })}
          </FlexBox>
        </ContentLayout>
      </ScrollView>
    </>
  );
}
