import React, { useContext, useState } from "react";
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import GCTab from "../../molecules/Home/GCTab";
import CalendarContainer from "./CalendarContainer";
import GraphContainer from "./GraphContainer";
import { ComponentHeightContext } from "../../../utils/ComponentHeightContext";
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabView,
} from "react-native-tab-view";
import HomeTabHeader from "./HomeTabHeader";

const FirstRoute = () => <GraphContainer myData={[]} />;

const SecondRoute = () => {
  return <CalendarContainer />;
};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const renderTabBar = (
  props: SceneRendererProps & {
    navigationState: NavigationState<{
      key: string;
      title: string;
    }>;
  },
  setIndex: React.Dispatch<React.SetStateAction<number>>
) => {
  return <HomeTabHeader props={props} setIndex={setIndex} />;
};

const clientHeight = Dimensions.get("window").height;

const GCContainer = ({ myData }) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "그래프" },
    { key: "second", title: "캘린더" },
  ]);

  const [graphSelected, setGraphSelected] = useState(true);
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
        onIndexChange={setIndex}
        renderTabBar={(props) => renderTabBar(props, setIndex)}
        initialLayout={{ width: layout.width }}
        onSwipeEnd={() => {}}
      ></TabView>
      {/* <GCTab
        graphSelected={graphSelected}
        setGraphSelected={setGraphSelected}
      />
      {graphSelected ? (
        <GraphContainer myData={myData} />
      ) : (
        <CalendarContainer />
      )} */}
    </View>
  );
};

export default GCContainer;
