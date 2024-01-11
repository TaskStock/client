import React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { checkStorage } from "../utils/asyncStorage";
import { VictoryAxis, VictoryCandlestick, VictoryChart } from "victory-native";

const ProjectScreen = () => {
  return (
    <View>
      <Text>ProjectScreen</Text>

      <TouchableOpacity onPress={checkStorage}>
        <Text>Check Storage</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProjectScreen;
