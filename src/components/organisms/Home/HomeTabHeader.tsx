import { View, Text } from "react-native";
import React from "react";
import { NavigationState, SceneRendererProps } from "react-native-tab-view";
import styled from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";

const Container = styled.View`
  padding: 0 ${spacing.gutter}px;
  flex-direction: row;
  gap: ${spacing.gutter}px;
`;

const Tab = styled.Pressable<{ graphSelected: boolean }>`
  border-bottom-width: ${useResponsiveFontSize(3)}px;
  border-bottom-color: ${(props) =>
    props.graphSelected ? props.theme.text : "transparent"};
  padding-bottom: ${useResponsiveFontSize(10)}px;
`;
const TabText = styled.Text<{ isFocused: boolean }>`
  font-size: ${useResponsiveFontSize(20)}px;
  font-family: ${(props) => (props.isFocused ? "bold" : "regular")};
  color: ${(props) =>
    props.isFocused ? props.theme.text : props.theme.textDim};
`;

export default function HomeTabHeader({
  props,
  setIndex,
}: {
  props: SceneRendererProps & {
    navigationState: NavigationState<{
      key: string;
      title: string;
    }>;
  };
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <Container>
      {props.navigationState.routes.map((route, i) => {
        const isFocused = props.navigationState.index === i;

        return (
          <Tab
            key={props.navigationState.routes[i].title}
            onPress={() => setIndex(i)}
            graphSelected={props.navigationState.index === i}
          >
            <TabText isFocused={isFocused}>
              {props.navigationState.routes[i].title}
            </TabText>
          </Tab>
        );
      })}
    </Container>
  );
}
