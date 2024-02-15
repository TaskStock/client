import { View, Text } from "react-native";
import React from "react";
import { Shadow } from "react-native-shadow-2";
import { spacing } from "../../constants/spacing";
import { palette } from "../../constants/colors";

/* 안드로이드용 */
/* elevation: 2; */

/* IOS용으로 추가 */
// shadow-color: #000;
// shadow-offset: 0px 4px;
/* shadow-opacity: 0.1; */
// shadow-radius: 10px;

export default function ShadowForProject({
  children,
  radius,
}: {
  children: React.ReactNode;
  radius?: number;
}) {
  return (
    <Shadow
      distance={7}
      offset={[0, 5]}
      startColor={palette.shadow}
      style={{
        borderRadius: radius ? radius : spacing.gutter,
        // flex: 1,
        width: "100%",
      }}
    >
      {children}
    </Shadow>
  );
}

export function ShadowForRetrospect({
  children,
  radius,
}: {
  children: React.ReactNode;
  radius?: number;
}) {
  return (
    <Shadow
      distance={8}
      offset={[0, 4]}
      startColor={palette.shadow}
      style={{
        borderRadius: radius ? radius : spacing.gutter,
        // flex: 1,
        width: "100%",
      }}
    >
      {children}
    </Shadow>
  );
}

export function ShadowForStockItem({
  children,
  radius,
}: {
  children: React.ReactNode;
  radius?: number;
}) {
  return (
    <Shadow
      distance={8}
      offset={[0, 4]}
      startColor={palette.shadow}
      style={{
        borderRadius: radius ? radius : spacing.gutter,
        // flex: 1,
        width: "100%",
      }}
    >
      {children}
    </Shadow>
  );
}
