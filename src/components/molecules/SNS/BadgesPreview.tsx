import { Pressable, Image } from "react-native";
import React from "react";
import { IconsWithoutFeedBack } from "../../atoms/Icons";
import { spacing } from "../../../constants/spacing";
import { useTheme } from "styled-components";
import FlexBox from "../../atoms/FlexBox";
import styled from "styled-components/native";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import { BADGES } from "../../../../public/data/badges";
import { useAppSelect } from "../../../store/configureStore.hooks";

const BadgeContainer = styled.View`
  width: ${useResponsiveFontSize(27)}px;
  height: ${useResponsiveFontSize(27)}px;
  border-radius: ${useResponsiveFontSize(27)}px;
  background-color: ${({ theme }) => theme.text};
  justify-content: center;
  align-items: center;
`;

const Badge = ({ type }) => {
  const badgeData = BADGES[type][0];
  const imageSrc = badgeData.image;
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

const BadgesPreview = ({ onPress }) => {
  const theme = useTheme();
  const { badges } = useAppSelect((state) => state.badge);

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
            <Badge type={badge} key={badge} />
          ))}
        </FlexBox>
      </FlexBox>
    </Pressable>
  );
};

export default BadgesPreview;
