import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const checkStorage = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");

    console.log("Check => Access Token: ", accessToken);
  } catch (error) {
    console.error("Error reading values from AsyncStorage", error);
  }
};

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
