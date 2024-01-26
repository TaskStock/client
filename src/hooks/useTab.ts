import React from "react";
import { SceneMap } from "react-native-tab-view";

export const useTab = ({
  routeMap,
  sceneMap,
}: {
  routeMap: {
    key: string;
    title: string;
  }[];
  sceneMap: {
    [key: string]: React.ComponentType<any>;
  };
}) => {
  const [routes] = React.useState(routeMap);

  const renderScene = SceneMap(sceneMap);

  const [index, setIndex] = React.useState(0);

  const onChangeIndex = (index: number) => {
    setIndex(index);
  };

  return {
    renderScene,
    index,
    onChangeIndex,
    routes,
  };
};
