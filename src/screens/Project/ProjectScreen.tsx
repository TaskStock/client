import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Pressable } from "react-native";
import { Portal } from "react-native-portalize";
import {
  NavigationState,
  SceneRendererProps,
  TabView,
} from "react-native-tab-view";
import { useTheme } from "styled-components/native";
import Icons from "../../components/atoms/Icons";
import PageMainHeader from "../../components/molecules/PageMainHeader";
import TabHeader from "../../components/molecules/TabHeader";
import TutorialBox from "../../components/molecules/TutorialBox";
import ProjectScreenFirst from "../../components/pages/project/ProjectScreenFirst";
import ProjectScreenSecond from "../../components/pages/project/ProjectScreenSecond";
import { useTab } from "../../hooks/useTab";
import { ProjectStackParamList } from "../../navigators/ProjectStack";
import { useAppDispatch, useAppSelect } from "../../store/configureStore.hooks";
import { resetProjectForm } from "../../store/modules/project/project";
import {
  checkProjectFirstTime,
  setProjectTutorial,
  setStep6,
} from "../../store/modules/tutorial";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";

const sceneMap = {
  first: ProjectScreenFirst,
  second: ProjectScreenSecond,
};

const routeMap = [
  { key: "first", title: "프로젝트" },
  { key: "second", title: "회고" },
];

const ProjectScreen = () => {
  const showTutorialIfFirst = async () => {
    const first = await checkProjectFirstTime();
    if (first) {
      dispatch(setProjectTutorial(true));
    }
  };
  useEffect(() => {
    showTutorialIfFirst();
  }, []);
  const { showProjectTutorial, step6, step7 } = useAppSelect(
    (state) => state.tutorial
  );

  const { index, onChangeIndex, renderScene, routes } = useTab({
    routeMap,
    sceneMap,
  });

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<{
        key: string;
        title: string;
      }>;
    }
  ) => {
    return <TabHeader onPressTab={onChangeIndex} props={props} />;
  };

  const theme = useTheme();

  const navigation = useNavigation<NavigationProp<ProjectStackParamList>>();

  const dispatch = useAppDispatch();

  return (
    <Pressable
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
      onPress={() => {
        if (showProjectTutorial && step6) {
          dispatch(setStep6(false));
        }
      }}
    >
      <PageMainHeader title="프로젝트">
        {showProjectTutorial && step6 ? (
          <Pressable
            onPress={() => {
              dispatch(setStep6(false));
            }}
            style={{
              top: useResponsiveFontSize(-5),
              left: useResponsiveFontSize(-150),
            }}
          >
            <TutorialBox
              type={6}
              ratio={0.7}
              style={{
                height: 600,
              }}
            />
          </Pressable>
        ) : null}
        {showProjectTutorial && step7 ? (
          <TutorialBox
            type={7}
            ratio={0.7}
            style={{
              top: useResponsiveFontSize(95),
              right: useResponsiveFontSize(60),
            }}
          />
        ) : null}

        <Icons
          type="entypo"
          name="circle-with-plus"
          size={28}
          color={theme.text}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={() => {
            dispatch(resetProjectForm());
            navigation.navigate("ProjectStackWithoutTab", {
              screen: "ProjectManage",
            });
            dispatch(setProjectTutorial(false));
          }}
        />
      </PageMainHeader>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={onChangeIndex}
        renderTabBar={(props) => renderTabBar(props)}
        onSwipeEnd={() => {}}
        swipeEnabled={false}
      ></TabView>
    </Pressable>
  );
};

export default ProjectScreen;
