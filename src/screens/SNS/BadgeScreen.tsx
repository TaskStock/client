import React from "react";
import { Image, View } from "react-native";
import styled from "styled-components/native";
import { useAppSelect } from "../../store/configureStore.hooks";
import { BADGES } from "../../../public/data/badges";
import Icons from "../../components/atoms/Icons";
import FlexBox from "../../components/atoms/FlexBox";
import { spacing } from "../../constants/spacing";
import Text from "../../components/atoms/Text";
import Margin from "../../components/atoms/Margin";

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const Header = ({ gridOnPress, closeOnPress }) => (
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
      size={30}
      color="white"
      onPress={gridOnPress}
    />
    <Text size="lg" weight="semibold" color={"white"}>
      1/9
    </Text>
    <Icons
      name="close-circle-outline"
      type="material"
      size={38}
      color="white"
      onPress={closeOnPress}
    />
  </FlexBox>
);

const BadgeScreen = ({ navigation }) => {
  const { badges } = useAppSelect((state) => state.badge);
  // BADGES의 key의 개수 (page 수)
  const TOTAL_BADGES = Object.keys(BADGES).length;
  return (
    <Container>
      <Image
        source={BADGES[badges[0]][0].background}
        style={{
          width: "100%",
          height: "100%",
          resizeMode: "cover",
          position: "absolute",
        }}
      />
      <Header gridOnPress={() => {}} closeOnPress={() => navigation.goBack()} />
      <Image
        source={BADGES[badges[0]][0].image}
        style={{
          width: "80%",
          height: "40%",
          resizeMode: "cover",
        }}
      />
      <View style={{ gap: 10, alignItems: "center", flex: 1 }}>
        <Text size="xl" weight="semibold" color={"white"}>
          {BADGES[badges[0]][0].title}
        </Text>
        <Text size="lg" weight="semibold" color={"white"}>
          {BADGES[badges[0]][0].description}
        </Text>
        <Image
          source={require("../../../assets/images/badges/badge-dotGap.png")}
          style={{
            width: 10,
            height: 40,
            resizeMode: "contain",
          }}
        />
        <Text size="md" color={"white"}>
          2024년 12월 31일 획득
        </Text>
      </View>
      <Text size="md" color={"white"}>
        옆으로 넘겨 더 다양한 뱃지를 확인해보세요!
      </Text>
      <Margin margin={100} />
    </Container>
  );
};

export default BadgeScreen;
