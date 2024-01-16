import React, { createContext, useEffect, useState } from "react";
import { spacing } from "../constants/spacing";

type ComponentHeightContextType = {
  headerHeight: number;
  setHeaderHeight: React.Dispatch<React.SetStateAction<number>>;
  contentsHeight: number;
  setContentsHeight: React.Dispatch<React.SetStateAction<number>>;
  setGCTabHeight: React.Dispatch<React.SetStateAction<number>>;
  DEFAULT_HEIGHT: number;
  OPEN_STATE: number;
};

export const ComponentHeightContext = createContext<ComponentHeightContextType>(
  {
    headerHeight: 0,
    setHeaderHeight: () => {},
    contentsHeight: 0,
    setContentsHeight: () => {},
    setGCTabHeight: () => {},
    DEFAULT_HEIGHT: 0,
    OPEN_STATE: 0,
  }
);

export const ComponentHeightProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [contentsHeight, setContentsHeight] = useState(0);
  const [GCTabHeight, setGCTabHeight] = useState(0);

  // 값이 더이상 바뀌지 않으면 저장
  const [DEFAULT_HEIGHT, setDEFAULT_HEIGHT] = useState(0);
  const [OPEN_STATE, setOPEN_STATE] = useState(0);

  useEffect(() => {
    if (headerHeight !== 0 && contentsHeight !== 0 && GCTabHeight !== 0) {
      setDEFAULT_HEIGHT(headerHeight + contentsHeight + spacing.offset);
      setOPEN_STATE(headerHeight + GCTabHeight + spacing.small);
    }
  }, [headerHeight, contentsHeight, GCTabHeight]);

  return (
    <ComponentHeightContext.Provider
      value={{
        headerHeight,
        setHeaderHeight,
        contentsHeight,
        setContentsHeight,
        setGCTabHeight,
        DEFAULT_HEIGHT,
        OPEN_STATE,
      }}
    >
      {children}
    </ComponentHeightContext.Provider>
  );
};
