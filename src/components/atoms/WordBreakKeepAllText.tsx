import React from "react";
import { StyleSheet, TextStyle, View } from "react-native";
import Text from "./Text";

const WordBreakKeepAllText = ({
  text,
  textStyles,
  size = "md",
}: {
  text: string;
  textStyles?: TextStyle;
  size?: "sm" | "md" | "lg" | "xl";
}) => {
  return (
    <View style={styles.container}>
      {text.split(" ").map((word, index) => (
        <Text size={size} key={index} styles={textStyles}>
          {word}{" "}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WordBreakKeepAllText;
