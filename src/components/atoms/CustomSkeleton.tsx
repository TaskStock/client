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

  return (
    <SkeletonPlaceholder backgroundColor={theme.box}>
      {children}
    </SkeletonPlaceholder>
  );
}
