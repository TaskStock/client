import React from "react";
import styled from "styled-components/native";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import { spacing } from "../../constants/spacing";
import Text from "./Text";
import { useTheme } from "styled-components";

const FollowBtnContainer = styled.TouchableOpacity<{
  text: string;
}>`
  ${({ theme, text }) => {
    // 배경색 설정
    let backgroundColor = theme.subBtnGray; // 기본값
    if (text === "팔로우" || text === "맞팔로우") {
      backgroundColor = theme.text;
    } else if (text === "수락") {
      backgroundColor = theme.box;
    }

    // 테두리 설정
    let border = "none";
    if (text === "수락") {
      border = `1px solid ${theme.textDim}`;
    }

    return `
      background-color: ${backgroundColor};
      border: ${border};
      padding: ${useResponsiveFontSize(8)}px ${useResponsiveFontSize(16)}px;
      border-radius: ${spacing.small}px;
    `;
  }}
`;

const FollowBtn = ({ onPress, text }) => {
  const theme = useTheme();
  return (
    <FollowBtnContainer onPress={onPress} text={text}>
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
