import React from "react";
import { Image, Pressable } from "react-native";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import { BADGES } from "../../../../public/data/badges";
import { spacing } from "../../../constants/spacing";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import FlexBox from "../../atoms/FlexBox";
import { IconsWithoutFeedBack } from "../../atoms/Icons";

const BadgeContainer = styled.View`
  width: ${useResponsiveFontSize(27)}px;
  height: ${useResponsiveFontSize(27)}px;
  border-radius: ${useResponsiveFontSize(27)}px;
  background-color: ${({ theme }) => theme.text};
  justify-content: center;
  align-items: center;
`;

const Badge = ({ type }) => {
  //   const badgeData = BADGES[type][0];
  const badgeData = BADGES.find((badge) => badge.type === type);
  const imageSrc = badgeData?.image;
  return (
    <BadgeContainer>
      <Image
        source={imageSrc}
        style={{
          width: useResponsiveFontSize(27),
          height: useResponsiveFontSize(27),
          resizeMode: "contain",
        }}
      />
    </BadgeContainer>
  );
};

const BadgesPreview = ({ onPress, badges }) => {
  const theme = useTheme();

  return (
    <Pressable onPress={onPress}>
      <FlexBox gap={spacing.padding} alignItems="center">
        <IconsWithoutFeedBack
          name="trophy-award"
          type="material"
          size={spacing.offset}
          color={theme.text}
        />
        <FlexBox gap={-useResponsiveFontSize(8)} alignItems="center">
          {badges.map((badge) => (
            <Badge type={badge.type} key={badge.type} />
          ))}
        </FlexBox>
      </FlexBox>
    </Pressable>
  );
};

export default BadgesPreview;
