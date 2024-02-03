import React, { useContext, useEffect, useMemo } from "react";
import { Dimensions, View, useWindowDimensions } from "react-native";
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabView,
} from "react-native-tab-view";
import { ComponentHeightContext } from "../../../utils/ComponentHeightContext";
import HomeCalendar from "./HomeCalendar";
import GraphWithUserInfo from "../GraphWithUserInfo";
import TabHeader from "../../molecules/TabHeader";
import {
  useAppDispatch,
  useAppSelect,
} from "../../../store/configureStore.hooks";
import { setTabIndex } from "../../../store/modules/home";
import { useResizeLayoutOnFocus } from "../../../hooks/useResizeLayoutOnFocus";
import useUser from "../../../hooks/useUser";
import useValue from "../../../hooks/useValue";
import useTodos from "../../../hooks/useTodos";

const clientHeight = Dimensions.get("window").height;

const GCContainer = () => {
  const layout = useWindowDimensions();
  const dispatch = useAppDispatch();
  const index = useAppSelect((state) => state.home.tabIndex);

  const [routes] = React.useState([
    { key: "first", title: "그래프" },
    { key: "second", title: "캘린더" },
  ]);

  const { user, loading: userInfoLoading, error: userInfoError } = useUser();
  const { data: values, error, isError, isLoading, refetch } = useValue();
  const {
    data: todos,
    isLoading: todosIsLoading,
    isError: todosIsError,
  } = useTodos();

  const sceneMap = useMemo(() => {
    return {
      first: () => (
        <GraphWithUserInfo
          userInfo={{
            cumulative_value: user?.cumulative_value,
            value_yesterday_ago: user?.value_yesterday_ago,
            nickname: user?.user_name,
            error: userInfoError,
            loading: userInfoLoading,
          }}
          value={{
            data: values,
            isLoading,
            isError,
            error,
            refetch,
          }}
        />
      ),
      second: () => (
        <HomeCalendar
          user={{
            value_yesterday_ago: 0,
            cumulative_value: 0,
          }}
          todos={{
            data: todos,
            isLoading: todosIsLoading,
            isError: todosIsError,
          }}
        />
      ),
    };
  }, [user, values]);

  const renderScene = SceneMap(sceneMap);

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
