import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";
import Icons from "../../components/atoms/Icons";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const MyPageScreen = ({ navigation }) => {
  return (
    <Container>
      <Text>MyPageScreen</Text>
      <Icons
        type="ionicons"
        name="settings"
        size={50}
        color={"black"}
        onPress={() => {
          navigation.navigate("SettingsHome");
        }}
      />
    </Container>
  );
};

export default MyPageScreen;
