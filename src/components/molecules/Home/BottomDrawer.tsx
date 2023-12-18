import {
  Dimensions,
  Animated,
  GestureResponderEvent,
  PanResponderGestureState,
  PanResponder,
  Platform,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components/native";
import { darkMode } from "../../../atom/theme";
import { darkTheme, grayTheme } from "../../../constants/colors";
import { HeaderHeightContext } from "../../../utils/HeaderHeightContext";
import getNextState from "./getNextState";

const { height: screenHeight } = Dimensions.get("window");

interface BottomDrawerProps {
  children?: React.ReactNode;
  onDrawerStateChange: (nextState) => void;
}

export const HorizontalLine = styled.View`
  background-color: ${({ theme }) => theme.background};
  width: 48px;
  height: 5px;
  margin: 4px auto;
  border-radius: 7px;
`;

export const animateMove = (
  y: Animated.Value,
  toValue: number | Animated.Value,
  callback?: any
) => {
  Animated.spring(y, {
    toValue: -toValue,
    tension: 20,
    useNativeDriver: true,
  }).start((finished) => {
    finished && callback && callback();
  });
};
const onPanResponderRelease = (
  _: GestureResponderEvent,
  { moveY }: PanResponderGestureState,
  defaultHeight: number,
  openState: number,
  movementValue: (moveY: number) => number,
  state: Animated.Value,
  y: Animated.Value,
  onDrawerStateChange: (nextState) => void,
  CLOSED_STATE: number
) => {
  console.log("onPanResponderRelease", defaultHeight, openState);
  const valueToMove = movementValue(moveY);
  const nextState = getNextState(
    state._value,
    valueToMove,
    defaultHeight,
    openState,
    CLOSED_STATE
  );
  state.setValue(nextState);
  animateMove(y, nextState, onDrawerStateChange(nextState));
};
const handlePanResponder = (
  onMoveShouldSetPanResponder,
  onPanResponderMove,
  onPanResponderRelease,
  DEFAULT_HEIGHT,
  OPEN_STATE,
  CLOSED_STATE,
  movementValue,
  state,
  y,
  onDrawerStateChange
) => {
  console.log(Platform.OS, "handlePanResponder", DEFAULT_HEIGHT, OPEN_STATE);
  if (DEFAULT_HEIGHT && OPEN_STATE) {
    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder,
        onStartShouldSetPanResponderCapture: onMoveShouldSetPanResponder,
        onPanResponderMove,
        onPanResponderRelease: (e, gs) =>
          onPanResponderRelease(
            e,
            gs,
            DEFAULT_HEIGHT,
            OPEN_STATE,
            movementValue,
            state,
            y,
            onDrawerStateChange,
            CLOSED_STATE
          ),
      })
    ).current;

    return panResponder;
  }
};

const BottomDrawer: React.FunctionComponent<BottomDrawerProps> = ({
  children,
  onDrawerStateChange,
}) => {
  const {
    headerHeight,
    myInfoHeight,
    graphHeight,
    DEFAULT_HEIGHT,
    OPEN_STATE,
    CLOSED_STATE, // 0
  } = useContext(HeaderHeightContext);

  let defaultValue;
  let openState;
  if (DEFAULT_HEIGHT !== 0 && OPEN_STATE !== 0) {
    defaultValue = DEFAULT_HEIGHT;
    openState = OPEN_STATE;
  }

  const y = React.useRef(new Animated.Value(CLOSED_STATE)).current;
  const state = React.useRef(new Animated.Value(CLOSED_STATE)).current;
  const movementValue = (moveY: number) => screenHeight - moveY;

  const onPanResponderMove = (
    _: GestureResponderEvent,
    { moveY }: PanResponderGestureState
  ) => {
    const val = movementValue(moveY);
    animateMove(y, val);
  };

  const onMoveShouldSetPanResponder = (
    _: GestureResponderEvent,
    { dy }: PanResponderGestureState
  ) => Math.abs(dy) >= 10;

  const panResponder = handlePanResponder(
    onMoveShouldSetPanResponder,
    onPanResponderMove,
    onPanResponderRelease,
    DEFAULT_HEIGHT,
    OPEN_STATE,
    CLOSED_STATE,
    movementValue,
    state,
    y,
    onDrawerStateChange
  );
  console.log(panResponder);

  const isDark = useRecoilValue(darkMode);

  return (
    <Animated.View
      style={[
        {
          width: "100%",
          height: screenHeight,
          backgroundColor: isDark ? darkTheme.box : grayTheme.box,
          borderRadius: 20,
          position: "absolute",
          bottom: -screenHeight + DEFAULT_HEIGHT,
          transform: [{ translateY: y }],
          shadowColor: "rgba(0, 0, 0, 0.15)",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 1,
          shadowRadius: 15,
          elevation: 0, // android
        },
      ]}
      {...panResponder.panHandlers}
    >
      <HorizontalLine />
      {children}
    </Animated.View>
  );
};

export default BottomDrawer;
