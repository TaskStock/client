import React from "react";
import { spacing } from "../../constants/spacing";
import FlexBox from "../atoms/FlexBox";
import Text from "../atoms/Text";

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
