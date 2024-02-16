import { View, Text, Modal, Platform } from "react-native";
import React from "react";
import styled, { css } from "styled-components/native";
import OutsidePressHandler from "react-native-outside-press";
import { Shadow } from "react-native-shadow-2";
import { palette } from "../../constants/colors";
import { spacing } from "../../constants/spacing";

const ModalBox = styled.View`
  width: 80%;
  background-color: ${({ theme }) => theme.box};
  border-radius: 20px;
  padding: 45px 40px;
  border-width: ${({ theme }) => (theme.name == "dark" ? 1 : 0)}px;
  border-color: ${({ theme }) => theme.background};

  ${({ theme }) => css`
    ${Platform.OS === "ios" &&
    css`
      shadow-color: rgba(0, 0, 0, 0.25);
      shadow-offset: 0px 4px;
      shadow-opacity: 0.25;
      shadow-radius: 20px;
    `}

    ${Platform.OS === "android" &&
    css`
      elevation: 5;
    `}
  `}
`;

const ModalOverlay = styled.Pressable`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: rgba(0, 0, 0, 0.3); */
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
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      animationType="fade"
    >
      <ModalOverlay onPress={onPressOutside}>
        <Shadow
          distance={20}
          startColor={palette.shadow}
          offset={[0, 0]}
          style={{ borderRadius: 20 }}
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
