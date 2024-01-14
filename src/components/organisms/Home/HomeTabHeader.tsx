import React, { useContext, useEffect } from "react";
import { Animated } from "react-native";
import { NavigationState, SceneRendererProps } from "react-native-tab-view";
import styled, { useTheme } from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import { useAppDispatch } from "../../../store/configureStore.hooks";
import { setTabIndex } from "../../../store/modules/home";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import { ComponentHeightContext } from "../../../utils/ComponentHeightContext";

const Container = styled.View`
  padding: 0 ${spacing.gutter}px;
  flex-direction: row;
  gap: ${spacing.gutter}px;
`;

const Tab = styled.Pressable<{ graphSelected: boolean }>`
  /* border-bottom-width: ${useResponsiveFontSize(3)}px;
  border-bottom-color: ${(props) =>
    props.graphSelected ? props.theme.text : "transparent"}; */
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
}: {
  props: SceneRendererProps & {
    navigationState: NavigationState<{
      key: string;
      title: string;
    }>;
  };
}) {
  const theme = useTheme();

  const [translateValue] = React.useState(new Animated.Value(0));

  const dispatch = useAppDispatch();

  useEffect(() => {
    Animated.timing(translateValue, {
      toValue: props.navigationState.index,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [props.navigationState.index]);

  const tabWidth = React.useRef(0);
  const { setGCTabHeight } = useContext(ComponentHeightContext);
  return (
    <Container
      onLayout={(e) => {
        setGCTabHeight(e.nativeEvent.layout.height);
      }}
    >
      {props.navigationState.routes.map((route, i) => {
        const isFocused = props.navigationState.index === i;

        return (
          <Tab
            key={props.navigationState.routes[i].title}
            onPress={() => {
              dispatch(setTabIndex(i));
            }}
            graphSelected={props.navigationState.index === i}
            onLayout={(event) => {
              const { width } = event.nativeEvent.layout;
              tabWidth.current = width;
            }}
          >
            <TabText isFocused={isFocused}>
              {props.navigationState.routes[i].title}
            </TabText>
          </Tab>
        );
      })}
      <Animated.View
        style={{
          width: tabWidth.current,
          paddingBottom: useResponsiveFontSize(10),
          borderBottomWidth: useResponsiveFontSize(3),
          borderBottomColor: theme.text,
          position: "absolute",
          bottom: 0,
          left: 0,
          transform: [
            {
              translateX: translateValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, tabWidth.current + spacing.gutter],
              }),
            },
          ],
          marginLeft: spacing.gutter,
        }}
      ></Animated.View>
    </Container>
  );
}
