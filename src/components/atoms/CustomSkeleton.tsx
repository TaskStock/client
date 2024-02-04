import { View, Text } from "react-native";
import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useTheme } from "styled-components/native";

export default function CustomSkeleton({
  children,
  key,
}: {
  children: React.ReactElement;
  key?: string;
}) {
  const theme = useTheme();

  return (
    <SkeletonPlaceholder backgroundColor={theme.box}>
      {children}
    </SkeletonPlaceholder>
  );
}
