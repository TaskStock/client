import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const FriendScreen = () => {
  return (
    <Container>
      <Text>FriendScreen</Text>
    </Container>
  );
};

export default FriendScreen;
