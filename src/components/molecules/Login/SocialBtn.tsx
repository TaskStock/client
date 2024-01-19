import React from "react";
import styled from "styled-components/native";
import { palette } from "../../../constants/colors";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import { IconsPic } from "../../atoms/Icons";
import Text from "../../atoms/Text";
import { useTheme } from "styled-components";
import RecentlyLogginIn from "./RecentlyLogginIn";

const ButtonStyle = styled.TouchableOpacity<{ color?: string; type?: string }>`
  background-color: ${(props) => (props.color ? props.color : props.theme.box)};
  border: 1px solid
    ${(props) =>
      props.type !== "email" ? "transparent" : props.theme.emailLoginBtn};

  border-radius: ${useResponsiveFontSize(12)}px;
  width: 100%;
  align-items: center;
`;

const TextContainer = styled.View`
  padding: ${useResponsiveFontSize(14)}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: ${useResponsiveFontSize(8)}px;
`;

const IconsAsset = {
  kakao: require("../../../../assets/icons/kakao-black.png"),
  apple: require("../../../../assets/icons/apple-white.png"),
};

const SocialBtn = ({
  onPress,
  type = "email",
  recentlyLoggiedIn,
}: {
  onPress: () => void;
  type?: string;
  recentlyLoggiedIn?: boolean;
}) => {
  const theme = useTheme();
  return (
    <ButtonStyle
      onPress={onPress}
      type={type}
      color={
        type === "kakao"
          ? palette.kakao
          : type === "apple"
          ? "black"
          : "transparent"
      }
    >
      <RecentlyLogginIn shown={recentlyLoggiedIn} />
      <TextContainer>
        {type !== "email" && <IconsPic source={IconsAsset[type]} size={18} />}
        {type === "kakao" ? (
          <Text size="md" weight="semibold" color={"black"}>
            카카오로 계속하기
          </Text>
        ) : type === "apple" ? (
          <Text size="md" color={"white"} weight="semibold">
            Apple로 계속하기
          </Text>
        ) : (
          <Text size="md" weight="semibold" color={theme.emailLoginBtn}>
            이메일로 계속하기
          </Text>
        )}
      </TextContainer>
    </ButtonStyle>
  );
};

export default SocialBtn;
