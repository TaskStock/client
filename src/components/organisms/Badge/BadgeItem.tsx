import React from "react";
import { Dimensions, Image, View } from "react-native";
import { useAppSelect } from "../../../store/configureStore.hooks";
import Text from "../../atoms/Text";
import DotGap from "../../molecules/Badge/DotGap";
import FlexBox from "../../atoms/FlexBox";
import { spacing } from "../../../constants/spacing";
import { IconsPic } from "../../atoms/Icons";

const { width: clientWidth } = Dimensions.get("window");

const formatToLocal = (
  utcString?: string
): { year: string; month: string; day: string } => {
  if (!utcString) {
    return {
      year: "xxxx",
      day: "xx",
      month: "xx",
    };
  }

  const date = new Date(utcString);

  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return {
    year,
    day,
    month,
  };
};

const BadgeItem = ({ item }) => {
  // redux에 저장된 type과 일치하면 BADGES의 해당 type의 image를 사용
  const { badges: reduxBadges } = useAppSelect((state) => state.badge);
  const givenBadge = reduxBadges.find((badge) => badge.type === item.type);

  let image;
  let title;
  let description;
  let createdTime;

  if (!givenBadge) {
    image = require("../../../../assets/images/badges/badge-unknown.png");
    title = "아직 받지 못했어요";
    description = item.description;
    createdTime = null;
  } else {
    image = item.image;
    title = item.title;
    description = item.description;
    createdTime = givenBadge.created_time;
  }
  const { year, month, day } = createdTime
    ? formatToLocal(createdTime)
    : formatToLocal();

  return (
    <FlexBox
      direction="column"
      alignItems="center"
      styles={{ flex: 1, width: clientWidth }}
    >
      <Image
        source={image}
        style={{
          width: 280,
          height: 280,
          resizeMode: "cover",
          margin: spacing.offset,
        }}
      />

      <View style={{ gap: 10, alignItems: "center", flex: 1 }}>
        <Text size="xl" weight="semibold" color={"white"}>
          {title}
        </Text>
        <Text size="lg" weight="semibold" color={"white"}>
          {description}
        </Text>
        <DotGap />
        <FlexBox gap={spacing.padding} alignItems="center">
          <IconsPic
            source={require("../../../../assets/images/badges/badge-createdAt.png")}
            size={25}
          />

          <Text size="md" color={"white"}>
            {year}년 {month}월 {day}일 획득
          </Text>
        </FlexBox>
      </View>
    </FlexBox>
  );
};

export default BadgeItem;
