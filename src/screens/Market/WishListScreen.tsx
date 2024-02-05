import { Pressable, View } from "react-native";
import React, { useRef } from "react";
import PageHeader from "../../components/molecules/PageHeader";
import Section from "../../components/molecules/Section";
import Margin from "../../components/atoms/Margin";
import { spacing } from "../../constants/spacing";
import TabHeader from "../../components/molecules/TabHeader";
import Text from "../../components/atoms/Text";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MarketStackParamList } from "../../navigators/MarketStack";
import ContentLayout from "../../components/atoms/ContentLayout";
import FlexBox from "../../components/atoms/FlexBox";
import { StockItemForWishList } from "../../components/organisms/Market/StockItem";
import { useTheme } from "styled-components/native";
import {
  useGetAllWishListQuery,
  useToggleLikeWishItemMutation,
} from "../../store/modules/market/market";
import CustomSkeleton from "../../components/atoms/CustomSkeleton";

export default function WishListScreen() {
  const [index, setIndex] = React.useState(0);

  const filter = useRef<"like" | "latest">("like");

  const { data, isLoading, isError } = useGetAllWishListQuery({
    filter: filter.current,
    limit: 10,
    offset: 0,
  });

  const wishList = data?.wishlist;

  const [toggleLikeWishItem] = useToggleLikeWishItemMutation();

  const navigation =
    useNavigation<NativeStackNavigationProp<MarketStackParamList>>();

  const onPressRegister = () => {
    navigation.navigate("WishRegisterScreen");
  };

  const tabHeaderProps = {
    navigationState: {
      index: index,
      routes: [
        { key: "1", title: "좋아요순" },
        { key: "2", title: "최신등록순" },
      ],
    },
  };

  const theme = useTheme();

  const onPressWishListItem = (id: number) => {
    toggleLikeWishItem({ wishlist_id: id });
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <PageHeader
        headerRight={
          <Pressable onPress={onPressRegister}>
            <Text size="md" weight={"medium"}>
              등록
            </Text>
          </Pressable>
        }
      />
      <View
        style={{
          paddingHorizontal: spacing.gutter,
          paddingVertical: spacing.offset,
        }}
      >
        <Section.HeaderText size={24} isMainText={true}>
          위시 종목
        </Section.HeaderText>
        <Margin margin={spacing.padding} />
        <Section.HeaderSubText size={15}>
          많은 분들이 원하시는 종목은 태스팀 검토 후
        </Section.HeaderSubText>
        <Margin margin={spacing.small} />
        <Section.HeaderSubText size={15}>
          새롭게 추가될 수 있어요!
        </Section.HeaderSubText>
      </View>
      <Margin margin={spacing.offset} />
      <TabHeader
        onPressTab={(i) => {
          setIndex(i);
          filter.current = i === 0 ? "like" : "latest";
        }}
        props={tabHeaderProps}
      />
      <ContentLayout>
        <FlexBox direction="column" alignItems="stretch" gap={spacing.padding}>
          {!isLoading && wishList ? (
            wishList.length != 0 ? (
              wishList.map((v, i) => {
                return (
                  <StockItemForWishList
                    key={v.wishlist_id + "wish"}
                    left={i}
                    likes={v.like_count}
                    name={v.name}
                    onPress={() => {
                      onPressWishListItem(v.wishlist_id);
                    }}
                  ></StockItemForWishList>
                );
              })
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text size="md" weight="medium">
                  위시리스트가 비어있습니다.
                </Text>
              </View>
            )
          ) : (
            <>
              {[1, 2, 3].map((_, index) => (
                <CustomSkeleton>
                  <View
                    style={{
                      width: "100%",
                      height: 30,
                      borderRadius: 10,
                      marginBottom: 10,
                    }}
                  />
                </CustomSkeleton>
              ))}
            </>
          )}
        </FlexBox>
      </ContentLayout>
    </View>
  );
}
