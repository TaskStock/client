import { View, Text } from "react-native";
import React from "react";
import Margin from "../atoms/Margin";
import styled from "styled-components/native";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";

const SectionHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;
  z-index: 2;
`;

const SectionHeaderText = styled.Text<{
  systemTheme?: string;
  isMainText?: boolean;
}>`
  font-size: ${useResponsiveFontSize(18)}px;
  color: ${({ theme, systemTheme, isMainText }) =>
    systemTheme === "dark"
      ? theme.textDimReverse
      : isMainText
      ? theme.text
      : theme.textDim};
`;

const _Section = ({
  header,
  children,
  gapSize = "md",
}: {
  header: React.ReactNode;
  children?: React.ReactNode;
  gapSize?: "md" | "lg" | "xl";
}) => {
  const margin = gapSize === "md" ? 5 : gapSize === "lg" ? 10 : 15;

  return (
    <View>
      {header}
      <Margin margin={margin}></Margin>
      {children}
    </View>
  );
};

const Section = Object.assign(_Section, {
  Header: SectionHeader,
  HeaderText: SectionHeaderText,
});

export default Section;
