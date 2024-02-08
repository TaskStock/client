import React, { useCallback, useContext, useMemo } from "react";
import { Dimensions, View, useWindowDimensions } from "react-native";
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabView,
} from "react-native-tab-view";
import { useResizeLayoutOnFocus } from "../../../hooks/useResizeLayoutOnFocus";
import {
  useAppDispatch,
  useAppSelect,
} from "../../../store/configureStore.hooks";
import { setTabIndex } from "../../../store/modules/home";
import { ComponentHeightContext } from "../../../utils/ComponentHeightContext";
import TabHeader from "../../molecules/TabHeader";
import HomeScreenFirst from "../../pages/home/HomeScreenFirst";
import HomeScreenSecond from "../../pages/home/HomeScreenSecond";

const clientHeight = Dimensions.get("window").height;

const GCContainer = () => {
  const layout = useWindowDimensions();
  const dispatch = useAppDispatch();
  const index = useAppSelect((state) => state.home.tabIndex);

  const [routes] = React.useState([
    { key: "first", title: "그래프" },
    { key: "second", title: "캘린더" },
  ]);

  const sceneMap = useMemo(() => {
    return {
      first: () => <HomeScreenFirst />,
      second: () => <HomeScreenSecond />,
    };
  }, []);

  const renderScene = SceneMap(sceneMap);

  const onChangeIndex = (index: number) => {
    dispatch(setTabIndex(index));
  };

  const renderTabBar = useCallback(
    (
      props: SceneRendererProps & {
        navigationState: NavigationState<{
          key: string;
          title: string;
        }>;
      }
    ) => {
      return (
        <TabHeader
          onPressTab={(index) => {
            dispatch(setTabIndex(index));
          }}
          props={props}
        />
      );
    },
    []
  );

  const { setContentsHeight } = useContext(ComponentHeightContext);

  const onLayout = useResizeLayoutOnFocus({
    resizeFunction: setContentsHeight,
  });

  return (
    <View
      onLayout={onLayout}
      style={{
        height: clientHeight * 0.48,
      }}
    >
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={onChangeIndex}
        renderTabBar={(props) => renderTabBar(props)}
        initialLayout={{ width: layout.width }}
        onSwipeEnd={() => {}}
        swipeEnabled={false}
      ></TabView>
    </View>
  );
};

export default GCContainer;
