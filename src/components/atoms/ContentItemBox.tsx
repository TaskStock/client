import React from "react";
import styled from "styled-components/native";
import { spacing } from "../../constants/spacing";

export const ContentItemBoxContainer = styled.View<{
  reversed?: boolean;
  height?: number;
}>`
  border-radius: 20px;
  height: ${({ height }) => height + "px" || "auto"};
  background-color: ${({ theme, reversed }) =>
    reversed ? theme.text : theme.box};
  /* padding: ${spacing.offset}px; */
  padding: ${spacing.padding + spacing.small * 2.5}px ${spacing.offset}px;
`;

export default function ContentItemBox({
  children,
  reversed,
  height,
}: {
  children: React.ReactNode;
  reversed?: boolean;
  height?: number;
}) {
  return (
    <ContentItemBoxContainer height={height} reversed={reversed}>
      {children}
    </ContentItemBoxContainer>
  );
}
