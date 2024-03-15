import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useTheme } from "styled-components/native";
import ContentLayout from "../../components/atoms/ContentLayout";
import CustomSkeleton from "../../components/atoms/CustomSkeleton";
import FlexBox from "../../components/atoms/FlexBox";
import Margin from "../../components/atoms/Margin";
import Text from "../../components/atoms/Text";
import PageHeader from "../../components/molecules/PageHeader";
import Section from "../../components/molecules/Section";
import TabHeader from "../../components/molecules/TabHeader";
import { StockItemForWishList } from "../../components/organisms/Market/StockItem";
import { spacing } from "../../constants/spacing";
import { useSlideInvoke } from "../../hooks/useSlideInvoke";
import { useWishList } from "../../hooks/useWishList";
import { MarketStackParamList } from "../../navigators/MarketStack";
import { useAppDispatch } from "../../store/configureStore.hooks";
import {
  increaseWishOffset,
  setFilterIndex,
  useToggleLikeWishItemMutation,
} from "../../store/modules/market/market";

export default function WishListScreen() {
  const { filterIndex, isLoading, list, offset, refetch } = useWishList();

  const dispatch = useAppDispatch();

  const { handleScroll } = useSlideInvoke({
    onScrollBottom: () => {
      dispatch(increaseWishOffset());
    },
  });

  const [toggleLikeWishItem] = useToggleLikeWishItemMutation();

  const navigation =
    useNavigation<NativeStackNavigationProp<MarketStackParamList>>();

  const onPressRegister = () => {
    navigation.navigate("MarketStack", { screen: "WishRegisterScreen" });
  };

  const tabHeaderProps = {
    navigationState: {
      index: filterIndex,
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

  const onPressTab = (i: number) => {
    dispatch(setFilterIndex(i));
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
      <TabHeader onPressTab={onPressTab} props={tabHeaderProps} />
      <ContentLayout noVerticalPadding>
        <ScrollView
          onScroll={handleScroll}
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            paddingTop: spacing.padding,
            paddingBottom: 100,
          }}
          scrollEventThrottle={30}
          showsVerticalScrollIndicator={false}
        >
          <FlexBox
            direction="column"
            alignItems="stretch"
            gap={spacing.padding}
          >
            {!isLoading && list ? (
              list.length != 0 ? (
                list.map((v, i) => {
                  return (
                    <View key={v.wishlist_id + "wish"}>
                      <StockItemForWishList
                        left={i + 1}
                        likes={v.like_count}
                        name={v.name}
                        isLiked={v.is_liked}
                        onPress={() => {
                          onPressWishListItem(v.wishlist_id);
                        }}
                      ></StockItemForWishList>
                    </View>
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
                  <View key={index + "skel"}>
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
                  </View>
                ))}
              </>
            )}
          </FlexBox>
        </ScrollView>
      </ContentLayout>
    </View>
  );
}
