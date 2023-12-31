import React, { createContext, useEffect, useState } from "react";
import { Dimensions, Platform } from "react-native";
import { spacing } from "../constants/spacing";

const { height: screenHeight } = Dimensions.get("window");

type ComponentHeightContextType = {
  headerHeight: number;
  setHeaderHeight: React.Dispatch<React.SetStateAction<number>>;
  contentsHeight: number;
  setContentsHeight: React.Dispatch<React.SetStateAction<number>>;
  DEFAULT_HEIGHT: number;
  OPEN_STATE: number;
  CLOSED_STATE: number;
};

export const ComponentHeightContext = createContext<ComponentHeightContextType>(
  {
    headerHeight: 0,
    setHeaderHeight: () => {},
    contentsHeight: 0,
    setContentsHeight: () => {},
    DEFAULT_HEIGHT: 0,
    OPEN_STATE: 0,
    CLOSED_STATE: 0,
  }
);

export const ComponentHeightProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [contentsHeight, setContentsHeight] = useState(0);

  // 값이 더이상 바뀌지 않으면 저장
  const [DEFAULT_HEIGHT, setDEFAULT_HEIGHT] = useState(0);
  const [OPEN_STATE, setOPEN_STATE] = useState(0);

  useEffect(() => {
    if (headerHeight !== 0 && contentsHeight !== 0) {
      const _heightWithoutDrawer = headerHeight + contentsHeight;

      setDEFAULT_HEIGHT(screenHeight - _heightWithoutDrawer);

      const _openState = contentsHeight - spacing.offset;
      setOPEN_STATE(_openState);
    }
    console.log(headerHeight, contentsHeight);
  }, [headerHeight, contentsHeight]);

  const CLOSED_STATE = 0;

  return (
    <ComponentHeightContext.Provider
      value={{
        headerHeight,
        setHeaderHeight,
        contentsHeight,
        setContentsHeight,
        DEFAULT_HEIGHT,
        OPEN_STATE,
        CLOSED_STATE,
      }}
    >
      {children}
    </ComponentHeightContext.Provider>
  );
};
