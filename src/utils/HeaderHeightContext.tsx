import React, { createContext, useEffect, useState } from "react";
import { spacing } from "../constants/spacing";
import { Dimensions } from "react-native";

const { height: screenHeight } = Dimensions.get("window");

type HeaderHeightContextType = {
  headerHeight: number;
  setHeaderHeight: React.Dispatch<React.SetStateAction<number>>;
  myInfoHeight: number;
  setMyInfoHeight: React.Dispatch<React.SetStateAction<number>>;
  graphHeight: number;
  setGraphHeight: React.Dispatch<React.SetStateAction<number>>;
  DEFAULT_HEIGHT: number;
  OPEN_STATE: number;
  CLOSED_STATE: number;
};

export const HeaderHeightContext = createContext<HeaderHeightContextType>({
  headerHeight: 0,
  setHeaderHeight: () => {},
  myInfoHeight: 0,
  setMyInfoHeight: () => {},
  graphHeight: 0,
  setGraphHeight: () => {},
  DEFAULT_HEIGHT: 0,
  OPEN_STATE: 0,
  CLOSED_STATE: 0,
});

export const HeaderHeightProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [myInfoHeight, setMyInfoHeight] = useState(0);
  const [graphHeight, setGraphHeight] = useState(0);

  // 값이 더이상 바뀌지 않으면 저장
  const [DEFAULT_HEIGHT, setDEFAULT_HEIGHT] = useState(0);
  const [OPEN_STATE, setOPEN_STATE] = useState(0);

  useEffect(() => {
    if (headerHeight !== 0 && myInfoHeight !== 0 && graphHeight !== 0) {
      const _heightWithoutDrawer =
        headerHeight + 3 * spacing.offset + myInfoHeight + graphHeight;
      setDEFAULT_HEIGHT(screenHeight - _heightWithoutDrawer);
      setOPEN_STATE(_heightWithoutDrawer - headerHeight - 20);
    }
  }, [headerHeight, myInfoHeight, graphHeight]);

  const CLOSED_STATE = 0;

  return (
    <HeaderHeightContext.Provider
      value={{
        headerHeight,
        setHeaderHeight,
        myInfoHeight,
        setMyInfoHeight,
        graphHeight,
        setGraphHeight,
        DEFAULT_HEIGHT,
        OPEN_STATE,
        CLOSED_STATE,
      }}
    >
      {children}
    </HeaderHeightContext.Provider>
  );
};
