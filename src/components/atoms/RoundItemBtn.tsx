import { View, Text, Pressable } from "react-native";
import React from "react";
import styled from "styled-components/native";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";

const RoundItem = styled.View<{
  isSelected?: boolean;
  size?: "sm" | "md" | "xl";
}>`
  display: inline-flex;
  justify-content: center;
  box-sizing: border-box;
  align-items: center;
  flex-direction: row;

  padding: ${({ size }) => {
    switch (size) {
      case "sm":
        return `${useResponsiveFontSize(4)}px ${useResponsiveFontSize(17)}px;`;
      case "md":
        return `${useResponsiveFontSize(9)}px ${useResponsiveFontSize(20)}px;`;
      case "xl":
        return `${useResponsiveFontSize(17)}px ${useResponsiveFontSize(36)}px;`;
    }
  }}
  background-color: ${({ theme, isSelected }) =>
    theme.name == "gray" && isSelected
      ? theme.mainBtnReversed
      : theme.mainBtnGray};
  border-radius: ${({ size }) => {
    switch (size) {
      case "sm":
        return `${useResponsiveFontSize(30)}px;`;
      case "md":
        return `${useResponsiveFontSize(40)}px;`;
      case "xl":
        return `${useResponsiveFontSize(30)}px;`;
    }
  }}
  border-color: ${({ theme, isSelected }) =>
    theme.name == "dark" && isSelected ? theme.text : "none"};
  border-width: ${({ isSelected }) => (isSelected ? "1px" : "0px")};
`;

export const RoundItemBtnContainer = styled.View`
  display: flex;
  height: auto;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;
`;

export default function RoundItemBtn({
  isSelected,
  onPress,
  children,
  size = "md",
}: {
  isSelected?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
  size?: "sm" | "md" | "xl";
}) {
  return (
    <Pressable onPress={onPress}>
      <RoundItem isSelected={isSelected} size={size}>
        {children}
      </RoundItem>
    </Pressable>
  );
}
