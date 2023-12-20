import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Loader = () => {
  return (
    <Container>
      <ActivityIndicator />
    </Container>
  );
};

export default Loader;
