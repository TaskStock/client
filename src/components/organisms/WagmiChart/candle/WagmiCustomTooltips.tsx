import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
  GestureEvent,
  LongPressGestureHandler,
  LongPressGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
} from "react-native-reanimated";
import { CandlestickChartDimensionsContext } from "./Chart";
import { useCandlestickChart } from "./useCandlestickChart";
import { clamp } from "react-native-redash";

export default function WagmiTooltips({
  children,
}: {
  children: React.ReactNode;
}) {
  const { width, height } = React.useContext(CandlestickChartDimensionsContext);
  const { currentX, currentY, step } = useCandlestickChart();

  const opacity = useSharedValue(0);

  const tooltipPosition = useSharedValue<"left" | "right">("left");

  const onGestureEvent = useAnimatedGestureHandler<
    GestureEvent<LongPressGestureHandlerEventPayload>
  >({
    onActive: ({ x, y }) => {
      console.log("x: ", x);
      console.log("y: ", y);

      const boundedX = x <= width - 1 ? x : width - 1;
      if (boundedX < 100) {
        tooltipPosition.value = "right";
      } else {
        tooltipPosition.value = "left";
      }
      opacity.value = 1;
      currentY.value = clamp(y, 0, height);
      currentX.value = boundedX - (boundedX % step) + step / 2;
    },
    onEnd: () => {
      opacity.value = 0;
      currentY.value = -1;
      currentX.value = -1;
    },
  });

  return (
    <LongPressGestureHandler
      minDurationMs={0}
      maxDist={999999}
      onGestureEvent={onGestureEvent}
    >
      <Animated.View style={StyleSheet.absoluteFill}>{children}</Animated.View>
    </LongPressGestureHandler>
  );
}
