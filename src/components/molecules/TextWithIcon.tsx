import { View } from "react-native";
import Text from "../atoms/Text";
import Icons from "../atoms/Icons";
import FlexBox from "../atoms/FlexBox";
import { spacing } from "../../constants/spacing";
import React from "react";

export const TextWithIcon = ({
  text,
  children,
  textColor,
}: {
  text: string;
  children: React.ReactNode;
  textColor?: string;
}) => {
  return (
    <FlexBox gap={spacing.small} alignItems="center">
      {children}
      <Text size="md" color={textColor ? textColor : undefined}>
        {text}
      </Text>
    </FlexBox>
  );
};
