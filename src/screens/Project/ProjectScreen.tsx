import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, View } from "react-native";
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
import useHeight from "../../hooks/useHeight";
import { useProject } from "../../hooks/useProject";
import ContentLayout from "../../components/atoms/ContentLayout";
import ProjectList from "../../components/organisms/Project/ProjectList";

const sceneMap = {
  first: ProjectScreenFirst,
  second: ProjectScreenSecond,
};

const routeMap = [
  { key: "first", title: "프로젝트" },
  { key: "second", title: "기록" },
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
  const { NOTCH_TOP } = useHeight();

  const { projects, isError, isLoading } = useProject();

  const [focused, setFocused] = useState(false);
  useFocusEffect(
    useCallback(() => {
      setFocused(true);

      return () => {
        setFocused(false);
      };
    }, [])
  );

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
        {showProjectTutorial && step6 && focused ? (
          <Portal>
            <Pressable
              style={{ width: "100%", height: "100%" }}
              onPress={() => {
                dispatch(setStep6(false));
                console.log("pressed");
              }}
            >
              <TutorialBox
                type={6}
                ratio={0.7}
                style={{
                  height: 600,
                  top: 40,
                  left: 65,
                }}
              />
            </Pressable>
          </Portal>
        ) : null}
        {showProjectTutorial && step7 && focused ? (
          <Portal>
            <TutorialBox
              type={7}
              ratio={0.7}
              style={{
                top: useResponsiveFontSize(NOTCH_TOP + 40),
                right: useResponsiveFontSize(60),
              }}
            />
          </Portal>
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
      <ContentLayout noHorizontalPadding noVerticalPadding>
        <ProjectList
          projects={projects}
          isLoading={isLoading}
          isError={isError}
        ></ProjectList>
      </ContentLayout>
    </Pressable>
  );
};

export default ProjectScreen;
