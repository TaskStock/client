import React from "react";
import styled from "styled-components/native";
import { spacing } from "../../constants/spacing";

export const ContentItemBoxContainer = styled.View<{
  bgColor?: string;
  height?: number;
}>`
  border-radius: 20px;
  height: ${({ height }) => height + "px" || "auto"};
  background-color: ${({ bgColor, theme }) => bgColor || theme.box};
  padding: ${spacing.padding + spacing.small * 2.5}px ${spacing.offset}px;
`;

export default function ContentItemBox({
  children,
  height,
  bgColor,
}: {
  children: React.ReactNode;
  height?: number;
  bgColor?: string;
}) {
  return (
    <ContentItemBoxContainer height={height} bgColor={bgColor}>
      {children}
    </ContentItemBoxContainer>
  );
}
