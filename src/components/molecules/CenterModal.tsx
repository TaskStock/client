import { Modal } from "react-native";
import React from "react";
import styled, { css } from "styled-components/native";
import OutsidePressHandler from "react-native-outside-press";
import { Shadow } from "react-native-shadow-2";
import { palette } from "../../constants/colors";
import { spacing } from "../../constants/spacing";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";

const ModalBox = styled.View`
  width: 80%;
  background-color: ${({ theme }) => theme.box};
  border-radius: 20px;
  border-width: ${({ theme }) => (theme.name == "dark" ? 1 : 0)}px;
  border-color: ${({ theme }) => theme.background};
`;

const ModalOverlay = styled.Pressable`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function CenterModal({
  children,
  onPressOutside,
}: {
  children: React.ReactNode;
  onPressOutside: () => void;
}) {
  return (
    <Modal
      transparent
      style={{
        margin: 0,
      }}
      animationType="fade"
    >
      <ModalOverlay onPress={onPressOutside}>
        <Shadow
          distance={20}
          startColor={palette.shadow}
          offset={[0, 0]}
          style={{
            borderRadius: 20,
            width: "100%",
          }}
        >
          <ModalBox
            onStartShouldSetResponder={(event) => true}
            onTouchEnd={(e) => {
              e.stopPropagation();
            }}
          >
            {children}
          </ModalBox>
        </Shadow>
      </ModalOverlay>
    </Modal>
  );
}
