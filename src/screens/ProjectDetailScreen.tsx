import { View, Text, Dimensions } from "react-native";
import React from "react";
import PageHeader from "../components/molecules/PageHeader";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProjectStackParamList } from "../navigators/ProjectStack";
import { useTab } from "../hooks/useTab";
import PageMainHeader from "../components/molecules/PageMainHeader";
import { TabView } from "react-native-tab-view";
import HomeTabHeader from "../components/molecules/TabHeader";
import ContentLayout from "../components/atoms/ContentLayout";
import CalendarContainer from "../components/organisms/Home/CalendarContainer";
import HomeCalendar from "../components/organisms/HomeCalendar";

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
  first: () => <ContentLayout>{/* <HomeCalendar /> */}</ContentLayout>,
  second: () => (
    <ContentLayout>
      <Text>회고</Text>
    </ContentLayout>
  ),
};

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

  return (
    <>
      <PageHeader title={route.params.project_title || "프로젝트 상세"} />
      <View
        onLayout={(e) => {
          // setContentsHeight(e.nativeEvent.layout.height);
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
