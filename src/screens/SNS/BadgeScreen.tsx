import { View, Text } from "react-native";
import React from "react";
import PageHeader from "../../components/molecules/PageHeader";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const BadgeScreen = () => {
  return (
    <Container>
      <PageHeader title="뱃지" />
      <Text>BadgeScreen</Text>
    </Container>
  );
};

export default BadgeScreen;
