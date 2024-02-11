import { View, Text } from "react-native";
import React from "react";
import { Shadow } from "react-native-shadow-2";

/* 안드로이드용 */
/* elevation: 2; */

/* IOS용으로 추가 */
// shadow-color: #000;
// shadow-offset: 0px 4px;
/* shadow-opacity: 0.1; */
// shadow-radius: 10px;

export default function CustomShadow({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Shadow startColor="rgba(0,0,0,0)" offset={[0, 4]}>
      {children}
    </Shadow>
  );
}
