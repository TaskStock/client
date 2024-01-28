import { View } from "react-native";
import React from "react";
import useHeight from "../../hooks/useHeight";
import Text from "../atoms/Text";
import styled from "styled-components/native";
import { spacing } from "../../constants/spacing";
import FlexBox from "../atoms/FlexBox";

const Container = styled.View<{ notchTop: number }>`
  padding: ${(props) => props.notchTop + spacing.offset}px ${spacing.gutter}px
    ${spacing.offset}px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export default function PageMainHeader({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  const { NOTCH_TOP } = useHeight();

  return (
    <Container notchTop={NOTCH_TOP}>
      <Text size="xl" weight="bold">
        {title}
      </Text>
      {children}
    </Container>
  );
}
