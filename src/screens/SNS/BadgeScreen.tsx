import React, { useRef, useState } from "react";
import { Dimensions, FlatList, Image } from "react-native";
import styled from "styled-components/native";
import { BADGES } from "../../../public/data/badges";
import FlexBox from "../../components/atoms/FlexBox";
import Icons, { IconsPic } from "../../components/atoms/Icons";
import Margin from "../../components/atoms/Margin";
import Text from "../../components/atoms/Text";
import Share from "../../components/molecules/Badge/Share";
import { spacing } from "../../constants/spacing";
import { useAppSelect } from "../../store/configureStore.hooks";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";

import BadgeItem from "../../components/organisms/Badge/BadgeItem";
import { palette } from "../../constants/colors";

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
const BadgeScreen = ({ navigation }) => {
  const [currentPage, setCurrentBadge] = useState(1);
  const totalPage = BADGES.length;
  const flatListRef = useRef(null);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollPosition / clientWidth);
    const badgeType = BADGES[currentIndex].type;
    setCurrentBadge(badgeType);
  };

  const { badges: reduxBadges } = useAppSelect((state) => state.badge);
  const givenBadge = reduxBadges.find((badge) => badge.type === currentPage);
  return (
    <Container>
      {givenBadge && (
        <Image
          source={BADGES[currentPage - 1].background}
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
        gridOnPress={() => {}}
        closeOnPress={() => navigation.goBack()}
      />
      <FlatList
        data={BADGES}
        ref={flatListRef}
        keyExtractor={(item) => item.type.toString()}
        horizontal
        renderItem={({ item }) => <BadgeItem item={item} />}
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16} // Define how often the scroll event will be fired
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
