import React from "react";
import styled from "styled-components/native";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import { palette } from "../../../constants/colors";
import { IconsPic } from "../../atoms/Icons";
import Text from "../../atoms/Text";

const ButtonStyle = styled.TouchableOpacity<{ color?: string; type?: string }>`
  background-color: ${(props) => (props.color ? props.color : props.theme.box)};
  border: 1px solid
    ${(props) => (props.type !== "email" ? "transparent" : props.theme.text)};
  padding: ${useResponsiveFontSize(14)}px;
  border-radius: ${useResponsiveFontSize(12)}px;
  width: 100%;
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
}: {
  onPress: () => void;

  type?: string;
}) => {
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
      {type !== "email" && <IconsPic source={IconsAsset[type]} size={18} />}
      {type === "kakao" ? (
        <Text size="md" weight="semibold">
          카카오로 계속하기
        </Text>
      ) : type === "apple" ? (
        <Text size="md" color={"white"} weight="semibold">
          애플로 계속하기
        </Text>
      ) : (
        <Text size="md" weight="semibold">
          이메일로 계속하기
        </Text>
      )}
    </ButtonStyle>
  );
};

export default SocialBtn;
