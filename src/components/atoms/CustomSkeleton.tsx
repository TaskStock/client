import { View, Text } from "react-native";
import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useTheme } from "styled-components/native";

export default function CustomSkeleton({
  children,
}: {
  children: React.ReactElement;
}) {
  const theme = useTheme();

  const backgroundColor = theme.name === "dark" ? theme.box : "#E1E9EE";

  return (
    <SkeletonPlaceholder speed={1200} backgroundColor={backgroundColor}>
      {children}
    </SkeletonPlaceholder>
  );
}
