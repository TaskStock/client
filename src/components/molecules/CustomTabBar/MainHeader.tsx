import React from "react";
import styled from "styled-components/native";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import HeaderTop from "./HeaderTop";
import { grayTheme } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";

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

const TabButton = styled.TouchableOpacity<{ isFocused: boolean }>`
  align-items: center;
  justify-content: center;
  padding: 12px 5px 7px;
  border-bottom-width: 3px;
  border-bottom-color: ${(props) => (props.isFocused ? "#000" : "transparent")};
`;

const TabText = styled.Text<{ isFocused: boolean }>`
  font-size: 20px;
  font-family: "bold";
  color: ${(props) => (props.isFocused ? "#000" : "#949496")};
`;

export default function MainHeader({
  state,
  descriptors,
  navigation,
}: MaterialTopTabBarProps) {
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
            <TabButton
              isFocused={isFocused}
              onPress={onPress}
              key={`tab_${index}`}
            >
              <TabText isFocused={isFocused}>{label}</TabText>
            </TabButton>
          );
        })}
      </TabWrapper>
    </Container>
  );
}
