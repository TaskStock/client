import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, PanResponder } from "react-native";
import styled from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import useHeight from "../../../hooks/useHeight";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";

const { height: screenHeight } = Dimensions.get("window");

export const HorizontalLine = styled.View`
  background-color: ${({ theme }) => theme.background};
  width: ${useResponsiveFontSize(46)}px;
  height: ${spacing.small}px;
  margin: ${spacing.small}px auto;
  border-radius: ${spacing.small}px;
`;

const Drawer = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.box};
  border-radius: ${useResponsiveFontSize(20)}px;
  position: absolute;
  /* top: 0; */
`;
const AnimatedBox = Animated.createAnimatedComponent(Drawer);

const BottomDrawer = ({
  children,
  openState,
  closedState,
  onDrawerStateChange,
}) => {
  const { BOTTOM_TAB } = useHeight();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerPositionY = useRef<any>(new Animated.Value(0)).current;

  useEffect(() => {
    const nextState = drawerOpen ? "OPEN_STATE" : "CLOSED_STATE";
    onDrawerStateChange(nextState);
  }, [drawerOpen]);

  const open = closedState - openState;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        drawerPositionY.setOffset(drawerPositionY._value); // 현재 위치를 오프셋으로 설정
        drawerPositionY.setValue(0); // 현재 값 초기화
      },
      onPanResponderMove: Animated.event([null, { dy: drawerPositionY }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, { dy }) => {
        drawerPositionY.flattenOffset(); // 오프셋 초기화

        const openThreshold = -200;
        if (drawerPositionY._value < openThreshold) {
          if (dy > 100) {
            // 열린 상태에서 아래로 충분히 드래그한 경우
            setDrawerOpen(false);
            Animated.spring(drawerPositionY, {
              toValue: 0, // 닫힘 위치로 이동
              useNativeDriver: false,
            }).start();
          } else {
            // 열린 상태에서 아래로 충분히 드래그하지 않은 경우
            Animated.spring(drawerPositionY, {
              toValue: -open, // 열린 상태 유지
              useNativeDriver: false,
            }).start();
          }
        } else {
          if (dy < -100) {
            // 닫힌 상태에서 위로 충분히 드래그한 경우
            setDrawerOpen(true);
            Animated.spring(drawerPositionY, {
              toValue: -open, // 열린 위치로 이동
              useNativeDriver: false,
            }).start();
          } else {
            // 위로 충분히 드래그하지 않은 경우
            Animated.spring(drawerPositionY, {
              toValue: 0, // 닫힌 상태 유지
              useNativeDriver: false,
            }).start();
          }
        }
      },
    })
  ).current;

  return (
    <AnimatedBox
      {...panResponder.panHandlers}
      style={{
        height: screenHeight - BOTTOM_TAB,
        top: closedState,

        transform: [{ translateY: drawerPositionY }],
      }}
    >
      <HorizontalLine />
      {children}
    </AnimatedBox>
  );
};

export default BottomDrawer;
