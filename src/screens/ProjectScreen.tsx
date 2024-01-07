import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { checkStorage } from "../utils/asyncStorage";

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
