import React from "react";
import Animated, {
  withTiming,
  useAnimatedProps,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import {
  Circle,
  Line,
  LineProps,
  NumberProp,
  Rect,
  RectProps,
  Svg,
} from "react-native-svg";

import type { TCandle, TDomain } from "./types";
import { getY, getHeight } from "./utils";
import { ColorValue, Pressable, View } from "react-native";
import styled, { useTheme } from "styled-components/native";
import dayjs from "dayjs";
import Text from "../../../atoms/Text";
import { Shadow } from "react-native-shadow-2";

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedLine = Animated.createAnimatedComponent(Line);

const TooltipText = styled.Text`
  font-family: "semibold";
  font-size: 15px;
  color: white;
`;

export type CandlestickChartCandleProps = {
  candle: TCandle;
  domain: TDomain;
  maxHeight: number;
  margin?: number;
  positiveColor?: string;
  negativeColor?: string;
  index: number;
  lineColor?: string;
  width: number;
  rectProps?: RectProps;
  lineProps?: LineProps;
  useAnimations?: boolean;
  renderRect?: ({
    x,
    y,
    width,
    height,
    fill,
  }: {
    x: NumberProp;
    y: NumberProp;
    width: NumberProp;
    height: NumberProp;
    fill: ColorValue;
    useAnimations: boolean;
  }) => React.ReactNode;
  renderLine?: ({
    x1,
    y1,
    x2,
    y2,
    stroke,
    strokeWidth,
  }: {
    x1: NumberProp;
    y1: NumberProp;
    x2: NumberProp;
    y2: NumberProp;
    stroke: ColorValue;
    strokeWidth: NumberProp;
    useAnimations: boolean;
  }) => React.ReactNode;
};

export const CandlestickChartCandle = ({
  candle,
  maxHeight,
  domain,
  margin = 2,
  positiveColor = "#10b981",
  negativeColor = "#ef4444",
  lineColor = "#6b7280",
  rectProps: overrideRectProps,
  lineProps: overrideLineProps,
  index,
  width,
  useAnimations = true,
}: // renderLine = (props) =>
//   props.useAnimations ? <AnimatedLine {...props} /> : <Line {...props} />,
// renderRect = (props) =>
//   props.useAnimations ? <AnimatedRect {...props} /> : <Rect {...props} />,
CandlestickChartCandleProps) => {
  const { close, open, high, low, timestamp } = candle;
  const isPositive = close > open;
  const fill = isPositive ? positiveColor : negativeColor;
  const x = index * width;
  const max = Math.max(open, close);
  const min = Math.min(open, close);

  const [isTooltipVisible, setIsTooltipVisible] = React.useState(false);

  const lineProps = React.useMemo(
    () => ({
      stroke: lineColor,
      strokeWidth: 1,
      direction: isPositive ? "positive" : "negative",
      x1: x + width / 2,
      y1: getY({ maxHeight, value: low, domain }),
      x2: x + width / 2,
      y2: getY({ maxHeight, value: high, domain }),
      ...overrideLineProps,
    }),
    [
      domain,
      fill,
      high,
      isPositive,
      low,
      maxHeight,
      overrideLineProps,
      width,
      x,
    ]
  );
  const animatedLineProps = useAnimatedProps(() => ({
    x1: withTiming(x + width / 2),
    y1: withTiming(getY({ maxHeight, value: low, domain })),
    x2: withTiming(x + width / 2),
    y2: withTiming(getY({ maxHeight, value: high, domain })),
  }));

  const rectProps = React.useMemo(
    () => ({
      width: width - margin * 2,
      fill: fill,
      direction: isPositive ? "positive" : "negative",
      x: x + margin,
      y: getY({ maxHeight, value: max, domain }),
      height: getHeight({ maxHeight, value: max - min, domain }),
      ...overrideRectProps,
    }),
    [
      domain,
      fill,
      isPositive,
      margin,
      max,
      maxHeight,
      min,
      overrideRectProps,
      width,
      x,
    ]
  );
  const animatedRectProps = useAnimatedProps(() => ({
    x: withTiming(x + margin),
    y: withTiming(getY({ maxHeight, value: max, domain })),
    height: withTiming(getHeight({ maxHeight, value: max - min, domain })),
  }));

  const today = dayjs.unix(timestamp).subtract(1, "days").format("MM/DD");

  const onPressCandleItem = () => {
    if (max == min) {
      return;
    }

    setIsTooltipVisible(!isTooltipVisible);
  };

  const renderRect = (props) =>
    props.useAnimations ? (
      <AnimatedRect
        onPressIn={onPressCandleItem}
        onPressOut={onPressCandleItem}
        {...props}
      />
    ) : (
      <Rect {...props} />
    );

  const renderLine = (props) =>
    props.useAnimations ? (
      <AnimatedLine
        onPressIn={onPressCandleItem}
        onPressOut={onPressCandleItem}
        {...props}
      />
    ) : (
      <Line {...props} />
    );

  const theme = useTheme();
  const tooltipWidth = 60;
  const YPosition = getY({ maxHeight, value: max, domain });
  const tooltipYPos = YPosition > 25 ? YPosition - 35 : YPosition + 35;
  const tooltipLeft =
    x > 20
      ? x + margin + (width - margin * 2) / 2 - tooltipWidth / 2
      : x + margin + (width - margin * 2) / 2 - 10;

  const tooltipLineY1 = tooltipYPos + 10;
  const tooltipLineY2 =
    (getY({ maxHeight, value: max, domain }) +
      getY({ maxHeight, value: min, domain })) /
    2;

  // stroke: lineColor,
  // strokeWidth: 1,
  // direction: isPositive ? "positive" : "negative",
  // x1: x + width / 2,
  // y1: getY({ maxHeight, value: low, domain }),
  // x2: x + width / 2,
  // y2: getY({ maxHeight, value: high, domain }),

  return (
    <>
      <Rect
        x={x}
        y={0}
        width={width}
        height={maxHeight}
        fill={"transparent"}
        onPressIn={onPressCandleItem}
        onPressOut={onPressCandleItem}
      ></Rect>

      {renderLine({
        ...lineProps,
        useAnimations,
        ...(useAnimations ? { animatedProps: animatedLineProps } : {}),
        stroke: lineColor,
      })}

      {renderRect({
        ...rectProps,
        useAnimations,
        ...(useAnimations ? { animatedProps: animatedRectProps } : {}),
      })}

      {isTooltipVisible && (
        <>
          <Animated.View
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(150)}
            style={{
              position: "absolute",
              top: tooltipYPos,
              left: tooltipLeft,
              paddingVertical: 7,
              borderRadius: 5,
              zIndex: 100,
              backgroundColor: "black",
              width: tooltipWidth,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: theme.name === "gray" ? 0 : 1,
              borderColor: theme.name === "gray" ? "trans rent" : "white",
            }}
          >
            <Shadow distance={5}>
              <TooltipText>{today}</TooltipText>
            </Shadow>
          </Animated.View>
          <Line
            stroke="black"
            strokeDasharray="2, 2"
            x1={x + width / 2}
            x2={x + width / 2}
            y1={tooltipLineY1}
            y2={tooltipLineY2}
          />
          <Circle
            cx={x + width / 2}
            cy={tooltipLineY2}
            r={3}
            fill={theme.text}
          ></Circle>

          {/* <Rect
            x={x + margin}
            y={getY({ maxHeight, value: max, domain })}
            width={30}
            height={20}
            // fill={"black"}
          ></Rect>
          <Text
            x={x + margin}
            y={getY({ maxHeight, value: max, domain }) + 20}
            fill={"white"}
          >
            {today}
          </Text> */}
        </>
      )}
    </>
  );
};
