import { useNavigation } from "@react-navigation/core";
import React from "react";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import { spacing } from "../../constants/spacing";
import useHeight from "../../hooks/useHeight";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import Icons from "../atoms/Icons";
import Text from "../atoms/Text";

const Container = styled.View<{ notchTop: number }>`
  padding: ${(props) => props.notchTop + spacing.padding}px ${spacing.offset}px
    ${spacing.padding}px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;
const Blank = styled.View`
  width: ${useResponsiveFontSize(35)}px;
  height: ${useResponsiveFontSize(35)}px;
`;
const Title = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const PageHeader = ({
  headerLeftShown = true,
  headerRight,
  title,
}: {
  headerLeftShown?: boolean;
  headerRight?: React.ReactNode;
  title?: string;
}) => {
  const { NOTCH_TOP } = useHeight();
  const theme = useTheme();
  const navigation = useNavigation();
  const HeaderLeft = () => (
    <Icons
      type="feather"
      name="chevron-left"
      size={35}
      color={theme.text}
      onPress={() => {
        navigation.goBack();
      }}
    />
  );

  return (
    <Container notchTop={NOTCH_TOP}>
      {headerLeftShown ? <HeaderLeft /> : <Blank />}
      <Title>
        <Text size="lg" weight="semibold">
          {title}
        </Text>
      </Title>
      {headerRight ? headerRight : <Blank />}
    </Container>
  );
};

export default PageHeader;
