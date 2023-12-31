import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
} from "react-native";
import styled, { useTheme } from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import useHeight from "../../../hooks/useHeight";
import { ComponentHeightContext } from "../../../utils/ComponentHeightContext";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import Loader from "../../atoms/Loader";

const { height: screenHeight } = Dimensions.get("window");

interface BottomDrawerProps {
  children?: React.ReactNode;
  onDrawerStateChange: (nextState) => void;
}

export const HorizontalLine = styled.View`
  background-color: ${({ theme }) => theme.background};
  width: ${useResponsiveFontSize(46)}px;
  height: ${spacing.small}px;
  margin: ${spacing.small}px auto;
  border-radius: ${spacing.small}px;
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

const getNextState = (
  currentState,
  OPEN_STATE: number,
  CLOSED_STATE: number,
  draggedUp: boolean
) => {
  switch (currentState) {
    case OPEN_STATE:
      return draggedUp ? OPEN_STATE : CLOSED_STATE;
    case CLOSED_STATE:
      return draggedUp ? OPEN_STATE : CLOSED_STATE;
    default:
      return currentState;
  }
};

const BottomDrawer: React.FunctionComponent<BottomDrawerProps> = ({
  children,
  onDrawerStateChange,
}) => {
  const {
    DEFAULT_HEIGHT,
    OPEN_STATE,
    CLOSED_STATE, // 0
  } = useContext(ComponentHeightContext);

  // final value
  const [defaultValue, setDefaultValue] = useState(0);
  const [openState, setOpenState] = useState(0);

  useEffect(() => {
    if (DEFAULT_HEIGHT !== defaultValue || OPEN_STATE !== openState) {
      setDefaultValue(DEFAULT_HEIGHT);
      setOpenState(OPEN_STATE);
    }
    handlePanResponder();
  }, [DEFAULT_HEIGHT, OPEN_STATE]);

  const [panResponder, setPanResponder] = useState(null);
  const [draggedUp, setDraggedUp] = useState(false);

  const y = useRef(new Animated.Value(CLOSED_STATE)).current;
  const state = useRef(new Animated.Value(CLOSED_STATE)).current;
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
  ) => {
    dy < 0 ? setDraggedUp(true) : setDraggedUp(false);
    return Math.abs(dy) >= 70;
  };

  const onPanResponderRelease = (
    _: GestureResponderEvent,
    { moveY }: PanResponderGestureState
  ) => {
    const nextState = getNextState(
      state._value,
      openState,
      CLOSED_STATE,
      draggedUp
    );
    state.setValue(nextState);
    animateMove(y, nextState, onDrawerStateChange(nextState));
  };

  const handlePanResponder = () => {
    if (defaultValue !== 0 && openState !== 0) {
      const _panResponder = PanResponder.create({
        onMoveShouldSetPanResponder,
        onStartShouldSetPanResponderCapture: onMoveShouldSetPanResponder,
        onPanResponderMove,
        onPanResponderRelease,
      });
      if (_panResponder !== panResponder) {
        setPanResponder(_panResponder);
      }
    }
  };

  useEffect(() => {
    handlePanResponder();
  }, [defaultValue, openState, draggedUp]);

  const theme = useTheme();
  if (!panResponder) {
    return <Loader />;
  }

  const { NOTCH_BOTTOM } = useHeight();
  return (
    <Animated.View
      style={[
        {
          width: "100%",
          height: screenHeight,
          backgroundColor: theme.box,
          borderRadius: useResponsiveFontSize(20),
          position: "absolute",
          bottom:
            -screenHeight + defaultValue - NOTCH_BOTTOM - 60 - spacing.offset,
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
