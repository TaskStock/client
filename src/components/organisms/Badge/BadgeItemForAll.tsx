import React from "react";
import { Dimensions, Image, View } from "react-native";
import styled from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import Text from "../../atoms/Text";
import { useTheme } from "styled-components";
import { useAppSelect } from "../../../store/configureStore.hooks";

const { width: clientWidth } = Dimensions.get("window");

const Box = styled.View`
  width: ${(clientWidth - useResponsiveFontSize(15) - spacing.offset * 2) /
  2}px;
  height: ${(clientWidth - useResponsiveFontSize(15) - spacing.offset * 2) /
  2}px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.box};
  border: 1px solid
    ${({ theme }) => (theme.name === "dark" ? theme.text : "transparent")};
  align-items: center;
  justify-content: center;
`;

const BadgeItemForAll = ({
  item,
  type,
}: {
  type: "me" | "friend";
  item: {
    type: number;
    title: string;
    description: string;
    image: string;
    background: string;
  };
}) => {
  const theme = useTheme();
  const { badges: myBadges } = useAppSelect((state) => state.badge);
  const { badges: friendBadges } = useAppSelect((state) => state.friends);
  let badges;
  if (type === "me") {
    badges = myBadges;
  } else {
    badges = friendBadges;
  }
  const givenBadge = badges.find((badge) => badge.type == item.type);

  let image;
  let title;
  let description;

  if (!givenBadge) {
    image = require("../../../../assets/images/badges/badge-unknown.png");
    title = "아직 받지 못했어요";
    description = item.description;
  } else {
    image = item.image;
    title = item.title;
    description = item.description;
  }

  return (
    <Box>
      <Image
        source={image}
        style={{
          width: "43%",
          height: "43%",
          resizeMode: "contain",
        }}
      />
      <Text size="lg" weight="bold">
        {title}
      </Text>
      <View
        style={{ paddingHorizontal: spacing.gutter, paddingTop: spacing.small }}
      >
        <Text size="md" color={theme.textDim} styles={{ textAlign: "center" }}>
          {description}
        </Text>
      </View>
    </Box>
  );
};

export default BadgeItemForAll;
