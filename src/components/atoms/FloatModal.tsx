import { View, Text, Modal, Platform } from "react-native";
import React from "react";
import styled from "styled-components/native";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import { spacing } from "../../constants/spacing";

export const ModalContainer = styled.View<{
  position: { top?: number; bottom?: number; left?: number; right?: number };
}>`
  position: absolute;
  top: ${({ position }) => position.top}px;
  right: ${({ position }) => position.right}px;
  padding: ${spacing.padding}px;
  /* z-index: 100; */
  border-radius: 10px;
  background-color: ${({ theme }) =>
    theme.name == "dark"
      ? theme.palette.neutral500_dark
      : theme.palette.neutral100_gray};
  flex-direction: column;
  gap: 10px;
  ${Platform.select({
    ios: `
      shadow-color: black;
      shadow-offset: 0px 2px;
      shadow-opacity: 0.25;
      shadow-radius: 10px;
    `,
    android: `
      elevation: 5;
    `,
  })}
`;

const ModalBtnContainer = styled.TouchableOpacity<{ isSelected?: boolean }>`
  background-color: ${({ isSelected, theme }) => {
    switch (theme.name) {
      case "dark":
        if (isSelected) {
          return theme.palette.neutral700_gray;
        } else {
          return theme.palette.neutral500_dark;
        }
      case "gray":
        if (isSelected) {
          return theme.text;
        } else {
          // 장송
          return theme.box;
        }
    }
  }};
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: ${useResponsiveFontSize(13)}px ${useResponsiveFontSize(38)}px;
`;

export function ModalBtn({
  children,
  isSelected,
  onPress,
}: {
  children: React.ReactNode;
  isSelected?: boolean;
  onPress?: () => void;
}) {
  return (
    <ModalBtnContainer isSelected={isSelected} onPress={onPress}>
      {children}
    </ModalBtnContainer>
  );
}

export default function FloatModal({
  isModalOpen,
  modalPosition,
  modalStartFrom = "bottom",
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  modalPosition: { x: number; y: number };
  modalStartFrom: "top" | "bottom";
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <ModalContainer
      position={{
        bottom: modalPosition.y,
        left: modalPosition.x,
      }}
    ></ModalContainer>
  );
}
