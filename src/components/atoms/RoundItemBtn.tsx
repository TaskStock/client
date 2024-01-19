import { View, Text, Pressable } from "react-native";
import React from "react";
import styled from "styled-components/native";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";

const RoundItem = styled.View<{ isSelected?: boolean }>`
  display: inline-flex;
  justify-content: center;
  box-sizing: border-box;
  align-items: center;
  flex-direction: row;
  padding: ${useResponsiveFontSize(4)}px ${useResponsiveFontSize(17)}px;

  background-color: ${({ theme, isSelected }) =>
    theme.name == "gray" && isSelected
      ? theme.mainBtnReversed
      : theme.mainBtnGray};
  border-radius: 20px;
  border-color: ${({ theme, isSelected }) =>
    theme.name == "dark" && isSelected ? theme.text : "none"};

  border-width: ${({ isSelected }) => (isSelected ? "1px" : "0px")};
`;

export default function RoundItemBtn({
  isSelected,
  onPress,
  children,
}: {
  isSelected?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
}) {
  return <RoundItem isSelected={isSelected}>{children}</RoundItem>;
}
