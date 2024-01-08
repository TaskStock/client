import React from "react";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import FlexBox from "../components/atoms/FlexBox";
import Text from "../components/atoms/Text";
import PageHeader from "../components/molecules/PageHeader";
import { spacing } from "../constants/spacing";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;
const IconContainer = styled.View`
  width: 40px;
  height: 40px;
  background-color: red;
`;
const AlarmContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: ${spacing.offset}px ${spacing.offset}px;
  background-color: ${({ theme }) => theme.box};
`;

const Icon = () => {
  return <IconContainer />;
};

const AlarmBox = ({
  title,
  createdAt,
}: {
  title: string;
  createdAt: string;
}) => {
  const theme = useTheme();
  return (
    <AlarmContainer>
      <Icon />
      <FlexBox
        direction="column"
        gap={spacing.padding}
        styles={{ paddingLeft: spacing.offset }}
      >
        <Text size="md">{title}</Text>
        <Text size="sm" color={theme.textDim}>
          {createdAt}
        </Text>
      </FlexBox>
    </AlarmContainer>
  );
};

const AlarmScreen = ({ navigation }) => {
  return (
    <Container>
      <PageHeader title="알림" />
      <AlarmBox title={"어제보다 5,000원 상승했어요!"} createdAt="12월 20일" />
      <AlarmBox title={"어제보다 5,000원 상승했어요!"} createdAt="12월 20일" />
    </Container>
  );
};

export default AlarmScreen;
