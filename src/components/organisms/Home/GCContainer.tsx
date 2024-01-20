import React, { useContext } from "react";
import { Dimensions, View, useWindowDimensions } from "react-native";
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabView,
} from "react-native-tab-view";
import { ComponentHeightContext } from "../../../utils/ComponentHeightContext";
import HomeCalendar from "./HomeCalendar";
import HomeGraph from "./HomeGraph";
import TabHeader from "../../molecules/TabHeader";
import {
  useAppDispatch,
  useAppSelect,
} from "../../../store/configureStore.hooks";
import { setTabIndex } from "../../../store/modules/home";

const FirstRoute = () => <HomeGraph myData={[]} />;

const SecondRoute = () => {
  return <HomeCalendar />;
};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const clientHeight = Dimensions.get("window").height;

const GCContainer = () => {
  const layout = useWindowDimensions();
  const dispatch = useAppDispatch();
  const index = useAppSelect((state) => state.home.tabIndex);

  const [routes] = React.useState([
    { key: "first", title: "그래프" },
    { key: "second", title: "캘린더" },
  ]);

  const onChangeIndex = (index: number) => {
    dispatch(setTabIndex(index));
  };

  const renderTabBar = (
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
  };

  const { setContentsHeight } = useContext(ComponentHeightContext);
  return (
    <View
      onLayout={(e) => {
        setContentsHeight(e.nativeEvent.layout.height);
      }}
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
