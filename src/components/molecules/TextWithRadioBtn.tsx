import React from "react";
import FlexBox from "../atoms/FlexBox";
import Text from "../atoms/Text";
import { Pressable } from "react-native";
import { RadioButton } from "react-native-radio-buttons-group";
import { useTheme } from "styled-components/native";
import { spacing } from "../../constants/spacing";

export default function TextWithRadio({
  id,
  value,
  selectedId,
  onPressRadio,
}: {
  id: number | undefined | null;
  value: string;
  selectedId: number | null | undefined;
  onPressRadio: () => void;
}) {
  const theme = useTheme();

  return (
    <Pressable onPress={onPressRadio}>
      <FlexBox alignItems="center" gap={spacing.small}>
        <RadioButton
          selected={selectedId === id}
          id={id + ""}
          onPress={onPressRadio}
          color={theme.text}
        ></RadioButton>
        <Text size="md">{value}</Text>
      </FlexBox>
    </Pressable>
  );
}
