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
  iconPosition = "left",
  size = "md",
}: {
  text: string;
  children: React.ReactNode;
  textColor?: string;
  iconPosition?: "left" | "right";
  size?: "xs" | "sm" | "md" | "lg";
}) => {
  return (
    <FlexBox gap={spacing.small} alignItems="center">
      {iconPosition === "left" ? (
        <>
          {children}
          <Text size={size} color={textColor ? textColor : undefined}>
            {text}
          </Text>
        </>
      ) : (
        <>
          <Text size={size} color={textColor ? textColor : undefined}>
            {text}
          </Text>
          {children}
        </>
      )}
    </FlexBox>
  );
};
