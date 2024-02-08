import { useRef } from "react";
import _ from "lodash";

export const useSlideInvoke = ({ onScrollBottom }) => {
  const throttleScrollEnd = useRef(
    _.throttle(() => {
      onScrollBottom();
    }, 2000)
  ).current;

  const handleScroll = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const paddingToBottom = 10; // Adjust this value based on your needs

    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      throttleScrollEnd();
    }
  };

  return {
    handleScroll,
  };
};
