import { View, Text } from "react-native";
import React from "react";
import Margin from "../atoms/Margin";
import styled from "styled-components/native";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import { spacing } from "../../constants/spacing";

const SectionHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;
  z-index: 2;
`;

const SectionHeaderText = styled.Text<{
  isMainText?: boolean;
  weight?: "bold" | "normal";
  size?: number;
}>`
  font-size: ${({ size }) => (size ? size : useResponsiveFontSize(18))}px;
  font-weight: ${({ weight }) => (weight ? weight : "bold")};
  color: ${({ theme, isMainText }) =>
    theme.name === "dark"
      ? theme.textDimReverse
      : isMainText
      ? theme.text
      : theme.textDim};
`;

const SectionHeaderSubText = styled.Text<{
  size?: number;
}>`
  font-size: ${({ size }) => (size ? size : useResponsiveFontSize(14))}px;
  color: ${({ theme }) =>
    theme.name === "dark" ? theme.textDimReverse : theme.textDim};
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
  HeaderSubText: SectionHeaderSubText,
});

export default Section;

export const MarketSection = ({
  headerText,
  subText,
  gapSize = "md",
  children,
}: {
  headerText: string;
  subText?: string;
  children?: React.ReactNode;
  gapSize?: "md" | "lg" | "xl";
}) => {
  const margin = gapSize === "md" ? 5 : gapSize === "lg" ? 10 : 15;

  return (
    <View style={{}}>
      <SectionHeaderText isMainText={true} size={24}>
        {headerText}
      </SectionHeaderText>
      {subText && (
        <>
          <Margin margin={5} />
          <SectionHeaderSubText size={15}>{subText}</SectionHeaderSubText>
        </>
      )}
      <Margin margin={15} />
      {children}
    </View>
  );
};
