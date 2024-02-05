import React from "react";
import { StyleSheet, TextStyle, View } from "react-native";
import Text from "./Text";

const WordBreakKeepAllText = ({
  text,
  textStyles,
}: {
  text: string;
  textStyles?: TextStyle;
}) => {
  return (
    <View style={styles.container}>
      {text.split(" ").map((word, index) => (
        <Text size="md" key={index} styles={textStyles}>
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
