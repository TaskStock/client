import { View, TouchableOpacity } from "react-native";
import React from "react";
import Text from "../components/atoms/Text";

const MyPageScreen = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Settings");
        }}
      >
        <Text size="md">Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyPageScreen;
