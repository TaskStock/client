import { View, Text, Dimensions } from "react-native";
import React, { useContext } from "react";
import PageHeader from "../components/molecules/PageHeader";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProjectStackParamList } from "../navigators/ProjectStack";
import { useTab } from "../hooks/useTab";
import { TabView } from "react-native-tab-view";
import HomeTabHeader from "../components/molecules/TabHeader";
import ContentLayout from "../components/atoms/ContentLayout";
import Calendar from "../components/molecules/Calendar";
import BottomDrawer from "../components/molecules/Home/BottomDrawer";
import { ComponentHeightContext } from "../utils/ComponentHeightContext";
import ItemContainerBox from "../components/molecules/ItemContainerBox";
import { DateInfo } from "../components/organisms/Home/HomeCalendar";
import { useAppSelect } from "../store/configureStore.hooks";
import dayjs from "dayjs";
import { useCurrentDate } from "../hooks/useCurrentDate";
import useTodos from "../hooks/useTodos";

type Props = NativeStackScreenProps<ProjectStackParamList, "ProjectDetail">;

const routeMap = [
  {
    key: "first",
    title: "캘린더",
  },
  {
    key: "second",
    title: "회고",
  },
];

const sceneMap = {
  first: ProjectDetailFirst,
  second: ProjectDetailSecond,
};

function ProjectDetailSecond() {
  return (
    <ContentLayout>
      <Text>회고</Text>
    </ContentLayout>
  );
}

function ProjectDetailFirst() {
  const { DEFAULT_HEIGHT, OPEN_STATE } = useContext(ComponentHeightContext);

  const { currentDate, subtract1Month, add1Month } = useCurrentDate();
  const onPressLeft = subtract1Month;
  const onPressRight = add1Month;

  // 이거 project에 해당하는 todo만 filter하도록.
  const { data: todos } = useTodos();

  return (
    <ContentLayout>
      <DateInfo
        currentDate={currentDate}
        onPressLeft={onPressLeft}
        onPressRight={onPressRight}
        isShowingInfo={false}
      ></DateInfo>
      <ItemContainerBox>
        <Calendar todos={todos}></Calendar>
      </ItemContainerBox>
      <BottomDrawer
        openState={OPEN_STATE}
        closedState={DEFAULT_HEIGHT}
        onDrawerStateChange={(state) => {}}
      >
        <Text>test</Text>
      </BottomDrawer>
    </ContentLayout>
  );
}

export default function ProjectDetailScreen({ navigation, route }: Props) {
  const { index, onChangeIndex, renderScene, routes } = useTab({
    routeMap,
    sceneMap,
  });

  const clientHeight = Dimensions.get("window").height;

  const renderTabBar = (props: any) => {
    return (
      <HomeTabHeader
        onPressTab={(index: number) => {
          onChangeIndex(index);
        }}
        props={props}
      />
    );
  };

  const { setContentsHeight } = useContext(ComponentHeightContext);

  return (
    <>
      <PageHeader title={route.params.project_title || "프로젝트 상세"} />
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
          onSwipeEnd={() => {}}
          swipeEnabled={false}
        ></TabView>
      </View>
    </>
  );
}
