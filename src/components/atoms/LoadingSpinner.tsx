import React, { useEffect, useRef } from "react";
import { Animated, Easing, RefreshControl, View } from "react-native";
import styled from "styled-components/native";
import { grayTheme } from "../../constants/colors";

interface Props {
  color?: string;
  size?: "sm" | "lg";
  background?: string;
}
interface SpinnerStyleProps {
  height: number;
  color?: string;
  background?: string;
}

const Container = styled.View<SpinnerStyleProps>`
  width: ${(props) => props.height}px;
  height: ${(props) => props.height}px;
  justify-content: center;
  align-items: center;
`;
const Background = styled.View<SpinnerStyleProps>`
  width: 100%;
  height: 100%;
  border-radius: ${(props) => props.height / 2}px;
  border-width: 2px;
  opacity: 0.2;
  border-color: ${(props) =>
    props.background ? props.background : props.theme.text};
`;
const Arrow = styled.View<Props>`
  width: ${(props) => (props.size === "lg" ? 8 : 7)}px;
  height: ${(props) => (props.size === "lg" ? 8 : 7)}px;
  border-width: 2px;
  border-color: transparent;
  border-right-color: ${(props) => props.color};
  border-bottom-color: ${(props) => props.color};
  position: absolute;
  top: ${(props) => (props.size === "lg" ? 0 : -3)}px;
  right: ${(props) => (props.size === "lg" ? 4 : 0)}px;
  transform: rotate(-10deg);
`;
const ProgressStyle = styled.View<SpinnerStyleProps>`
  width: 100%;
  height: 100%;
  border-radius: ${(props) => props.height / 2}px;
  border-color: transparent;
  border-top-color: ${(props) => props.color};
  border-width: 2px;
  position: absolute;
`;
const Progress = Animated.createAnimatedComponent(ProgressStyle);

const startRotationAnimation = (
  durationMs: number,
  rotationDegree: Animated.Value
): void => {
  Animated.loop(
    Animated.timing(rotationDegree, {
      toValue: 360,
      duration: durationMs,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();
};

const LoadingSpinner = ({
  size = "sm",
  color = grayTheme.high,
  background,
}: Props) => {
  const rotationDegree = useRef(new Animated.Value(0)).current;
  const height = size === "sm" ? 20 : 50;
  const durationMs = size === "sm" ? 1000 : 2000;

  useEffect(() => {
    startRotationAnimation(durationMs, rotationDegree);
  }, [durationMs, rotationDegree]);

  const rotate = rotationDegree.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Container accessibilityRole="progressbar" height={height}>
      <Background height={height} background={background} />
      <Progress
        color={color}
        height={height}
        style={{
          transform: [
            {
              rotateZ: rotate,
            },
          ],
        }}
      >
        <Arrow color={color} size={size} />
      </Progress>
    </Container>
  );
};

export default LoadingSpinner;

export const CustomRefreshControl = ({ refreshing, onRefresh }) => (
  <RefreshControl
    refreshing={refreshing}
    onRefresh={onRefresh}
    tintColor="transparent"
    colors={["transparent"]}
    style={{ backgroundColor: "transparent" }}
  />
);
export const RefreshSpinner = () => (
  <View
    style={{
      position: "absolute",
      width: "100%",
      height: 60,
      alignItems: "center",
      justifyContent: "center",
      top: -60,
    }}
  >
    <LoadingSpinner />
  </View>
);
