import React from "react";
import styled from "styled-components/native";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import { spacing } from "../../constants/spacing";
import Text from "./Text";
import { useTheme } from "styled-components";

const FollowBtnContainer = styled.TouchableOpacity<{ color: string }>`
  background-color: ${({ theme, color }) =>
    color === "inactive" ? theme.text : theme.subBtnGray};
  padding: ${useResponsiveFontSize(8)}px ${useResponsiveFontSize(16)}px;
  border-radius: ${spacing.small}px;
`;

const FollowBtn = ({ onPress, text }) => {
  const theme = useTheme();
  return (
    <FollowBtnContainer
      onPress={onPress}
      color={text === "팔로우" || text === "맞팔로우" ? "inactive" : "active"}
    >
      <Text
        size="sm"
        color={
          text === "팔로우" || text === "맞팔로우"
            ? theme.textReverse
            : theme.text
        }
      >
        {text}
      </Text>
    </FollowBtnContainer>
  );
};

export default FollowBtn;
