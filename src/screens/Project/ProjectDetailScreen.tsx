import React, { useMemo } from "react";
import PageHeader from "../../components/molecules/PageHeader";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProjectStackParamList } from "../../navigators/ProjectStack";
import { useTab } from "../../hooks/useTab";
import { TabView } from "react-native-tab-view";
import TabHeader from "../../components/molecules/TabHeader";
import ProjectDetailFirst from "../../components/pages/project/ProjectDetailFirst";
import ProjectDetailSecond from "../../components/pages/project/ProjectDetailSecond";

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

export default function ProjectDetailScreen({ navigation, route }: Props) {
  const sceneMap = useMemo(() => {
    return {
      first: () => <ProjectDetailFirst projectId={route.params.project_id} />,
      second: () => <ProjectDetailSecond projectId={route.params.project_id} />,
    };
  }, [route.params.project_id]);

  const { index, onChangeIndex, renderScene, routes } = useTab({
    routeMap,
    sceneMap,
  });

  const renderTabBar = (props: any) => {
    return (
      <TabHeader
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
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={onChangeIndex}
        renderTabBar={(props) => renderTabBar(props)}
        onSwipeEnd={() => {}}
        swipeEnabled={false}
      ></TabView>
    </>
  );
}
