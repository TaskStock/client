import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef } from "react";

export const useResizeLayoutOnFocus = ({
  resizeFunction,
}: {
  resizeFunction: (height: number) => void;
}) => {
  const size = useRef(0);

  useFocusEffect(() => {
    console.log("useResizeLayoutOnFocus");

    resizeFunction(size.current);
  });

  const onLayout = useCallback(
    (e) => {
      const { height } = e.nativeEvent.layout;
      if (size.current !== height) {
        size.current = height;
        resizeFunction(height);
      }
    },
    [resizeFunction, size]
  );

  return onLayout;
};
