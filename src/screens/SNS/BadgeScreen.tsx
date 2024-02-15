import React, { useRef, useState } from "react";
import { Dimensions, FlatList, Image } from "react-native";
import styled from "styled-components/native";
import { BADGES } from "../../../public/data/badges";
import FlexBox from "../../components/atoms/FlexBox";
import Icons, { IconsPic } from "../../components/atoms/Icons";
import Margin from "../../components/atoms/Margin";
import Text from "../../components/atoms/Text";
import Share from "../../components/molecules/Badge/Share";
import BadgeItem from "../../components/organisms/Badge/BadgeItem";
import { palette } from "../../constants/colors";
import { spacing } from "../../constants/spacing";
import { useAppSelect } from "../../store/configureStore.hooks";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${palette.neutral600_gray};
`;

const Header = ({ currentPage, totalPage, gridOnPress, closeOnPress }) => (
  <FlexBox
    alignItems="center"
    justifyContent="space-between"
    styles={{
      width: "100%",
      padding: spacing.offset,
    }}
  >
    <Icons
      name="grid"
      type="ionicons"
      size={useResponsiveFontSize(30)}
      color="white"
      onPress={gridOnPress}
    />
    <Text size="lg" weight="semibold" color={"white"}>
      {currentPage} / {totalPage}
    </Text>
    <IconsPic
      source={require("../../../assets/icons/badge-close.png")}
      size={45}
      onPress={closeOnPress}
    />
  </FlexBox>
);

const { width: clientWidth } = Dimensions.get("window");

// =============== 로직 ==================
// BADGES로 SORTED_BADGES 생성 (가지고 있는 뱃지, 가지고 있지 않은 뱃지 순)
// currentPage => SORTED_BADGES의 index + 1
// totalPage => SORTED_BADGES.length

// 현재 페이지의 뱃지가 가지고 있는 뱃지인지 확인
// badge.type === SORTED_BADGES[currentPage - 1].type
// =======================================

const BadgeScreen = ({ navigation, route }) => {
  const { type } = route.params;
  let reduxBadges;
  const { badges: myBadges } = useAppSelect((state) => state.badge);
  const { badges: friendBadges } = useAppSelect((state) => state.friends);

  if (type === "me") {
    reduxBadges = myBadges;
  } else {
    reduxBadges = friendBadges;
  }

  // ===== 가지고 있는 뱃지는 먼저 배치하기 위해 새 배열 생성 =====
  const ownedTypes = new Set(reduxBadges.map((badge) => badge.type));
  // 뱃지 분류 (가지고 있는 뱃지, 가지고 있지 않은 뱃지)
  const ownedBadges = BADGES.filter((badge) => ownedTypes.has(badge.type));
  const unownedBadges = BADGES.filter((badge) => !ownedTypes.has(badge.type));
  // Concatenate
  const SORTED_BADGES = [...ownedBadges, ...unownedBadges];

  // 현재 페이지
  const [currentPage, setCurrent] = useState(1);
  const totalPage = SORTED_BADGES.length;
  const flatListRef = useRef(null);

  // 현재 페이지의 뱃지가 가지고 있는 뱃지인지 확인
  const givenBadge = reduxBadges.find(
    (badge) => badge.type === SORTED_BADGES[currentPage - 1].type
  );

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollPosition / clientWidth);
    setCurrent(currentIndex + 1);
  };

  return (
    <Container>
      {givenBadge && (
        <Image
          source={SORTED_BADGES[currentPage - 1].background}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            position: "absolute",
          }}
        />
      )}

      <Header
        currentPage={currentPage}
        totalPage={totalPage}
        gridOnPress={() => {
          navigation.navigate("BadgeAll", {
            type,
            badges: SORTED_BADGES,
          });
        }}
        closeOnPress={() => navigation.goBack()}
      />
      <FlatList
        data={SORTED_BADGES}
        ref={flatListRef}
        keyExtractor={(item) => item.type.toString()}
        horizontal
        renderItem={({ item }) => <BadgeItem item={item} type={type} />}
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      />

      <Text size="sm" color={"white"}>
        옆으로 넘겨 더 다양한 뱃지를 확인해보세요!
      </Text>
      <Share onPress={() => {}} />
      <Margin margin={80} />
    </Container>
  );
};

export default BadgeScreen;
