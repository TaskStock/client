import React from "react";
import styled from "styled-components/native";
import { palette } from "../../../constants/colors";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import { IconsPic } from "../../atoms/Icons";
import Text from "../../atoms/Text";

const GoogleButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${palette.google};
  border-radius: ${useResponsiveFontSize(12)}px;
  border: 1px solid ${palette.google};
  justify-content: center;
`;
const GoogleLeft = styled.View`
  position: absolute;
  left: 0;
  top: 0;
  background-color: white;
  height: 100%;
  padding: 0 ${useResponsiveFontSize(16)}px;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${useResponsiveFontSize(12)}px;
  border-bottom-left-radius: ${useResponsiveFontSize(12)}px;
`;
const GoogleRight = styled.View`
  padding: ${useResponsiveFontSize(14)}px;
`;
const GoogleBtn = ({ onPress }) => {
  return (
    <GoogleButtonContainer onPress={onPress}>
      <GoogleLeft>
        <IconsPic
          source={require("../../../../assets/icons/google.png")}
          size={18}
        />
      </GoogleLeft>
      <GoogleRight>
        <Text size="md" weight="semibold" color="white">
          구글로 계속하기
        </Text>
      </GoogleRight>
    </GoogleButtonContainer>
  );
};

export default GoogleBtn;
