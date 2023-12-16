import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import HeaderTop from "./HeaderTop";
import { grayTheme } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import { Animated } from "react-native";
import Tab from "./Tab";

type Route = {
  key: string;
  name: string;
  params?: object | undefined;
};

const Container = styled.View`
  background-color: ${grayTheme.background};
`;

const TabWrapper = styled.View`
  flex-direction: row;
  display: flex;
  align-items: center;
  gap: ${spacing.offset}px;
  padding: 0 ${spacing.gutter}px;
`;
const BottomLine = styled.View`
  background-color: #000;
  height: 3px;
  width: 100%;
`;

export default function MainHeader({
  state,
  descriptors,
  navigation,
}: MaterialTopTabBarProps) {
  const [translateValue] = useState(new Animated.Value(0));
  const [width, setWidth] = useState(0);
  const [toValue, setToValue] = useState(0);

  useEffect(() => {
    Animated.spring(translateValue, {
      toValue,
      damping: 10,
      mass: 1,
      stiffness: 100,
      overshootClamping: true,
      restDisplacementThreshold: 0.001,
      restSpeedThreshold: 0.001,
      useNativeDriver: true,
    }).start();
  }, [state, translateValue, toValue]);
  return (
    <Container>
      <HeaderTop navigation={navigation} />
      <TabWrapper>
        {state.routes.map((route: Route, index: number) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          return (
            <Tab
              isFocused={isFocused}
              key={`tab_${index}`}
              label={label}
              onPress={onPress}
              setToValue={setToValue}
              setWidth={setWidth}
            />
          );
        })}
      </TabWrapper>
      <BottomLine
        as={Animated.View}
        style={{
          transform: [{ translateX: translateValue }],
          width,
        }}
      />
    </Container>
  );
}
