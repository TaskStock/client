import React, { useCallback, useEffect, useRef } from "react";
import { Platform, Pressable, ScrollView, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import styled, { useTheme } from "styled-components/native";
import { useProject } from "../../../hooks/useProject";
import { useAppSelect } from "../../../store/configureStore.hooks";
import { setAddTodoForm } from "../../../store/modules/todo/todo";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import Icons from "../../atoms/Icons";
import { Project } from "../../../@types/project";

const ProjectItemContainer = styled.View<{ height?: number }>`
  flex: 1;
  display: flex;
  height: auto;
  /* height: ${({ height }) => (height ? height + "px" : "auto")}; */
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;
`;

const ProjectItem = styled.View<{ isSelected?: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  flex-direction: row;
  padding: 0 20px;
  padding-bottom: ${Platform.OS === "ios" ? 0 : 3}px;
  height: 36px;
  /* height: ${Platform.OS === "ios" ? 36 : 38}px; */
  background-color: ${({ theme, isSelected }) =>
    theme.name == "gray" && isSelected
      ? theme.mainBtnReversed
      : theme.mainBtnGray};
  border-radius: 18px;
  /* border-radius: ${Platform.OS === "ios" ? 18 : 22}px; */

  border-color: ${({ theme, isSelected }) =>
    theme.name == "dark" && isSelected ? theme.text : "none"};

  border-width: ${({ isSelected }) => (isSelected ? "1px" : "0px")};
`;

const ProjectItemText = styled.Text<{ isSelected?: boolean }>`
  font-size: ${useResponsiveFontSize(16)}px;
  color: ${({ theme, isSelected }) =>
    theme.name === "gray" && isSelected ? theme.textReverse : theme.text};
`;

const ProjectItemComponent = ({
  isSelected,
  onPress,
  children,
}: {
  isSelected?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
}) => {
  const theme = useTheme();

  const systemTheme = useAppSelect((state) => state.theme.value);

  return (
    <Pressable onPress={onPress}>
      <ProjectItem isSelected={isSelected}>{children}</ProjectItem>
    </Pressable>
  );
};

export default function ProjectItemList({}: // scrollViewRef,
{
  // scrollViewRef: React.RefObject<ScrollView>;
}) {
  const {
    projects: projectList,
    fetchAddProject,
    setIsAddProject,
    setNewProjectInput,
    isAddProject,
    newProjectInput,
    onChangeNewProjectName,
  } = useProject();

  const dispatch = useDispatch();
  const textInputRef = useRef<TextInput | null>(null);

  const addTodoForm = useAppSelect((state) => state.todo.addTodoForm);

  const onPressProjectItem = (project: Project) => () => {
    dispatch(setAddTodoForm({ name: "project_id", value: project.project_id }));
  };

  const onPressAddProjectBtn = () => {
    console.log("onPressAddProjectBtn");
    setIsAddProject(!isAddProject);
    setNewProjectInput("");

    setTimeout(() => {
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
    }, 300);
  };

  const theme = useTheme();
  const [projectContainerHeight, setProjectContainerHeight] = React.useState(0);

  const onLayoutProjectContainer = (e) => {
    if (projectContainerHeight == 0) {
      setProjectContainerHeight(e.nativeEvent.layout.height);
    }
  };

  const projectContainerRef = React.useRef<View>(null);

  // useEffect(() => {
  //   if (isAddProject) {
  //     setTimeout(() => {
  //       scrollViewRef.current?.scrollToEnd({ animated: true });
  //     }, 100);
  //   }
  // }, [isAddProject]);

  return (
    <ProjectItemContainer
      height={projectContainerHeight}
      onLayout={onLayoutProjectContainer}
      ref={projectContainerRef}
    >
      <ProjectItemComponent
        isSelected={
          addTodoForm.project_id === null ||
          addTodoForm.project_id === undefined
        }
        onPress={() => {
          dispatch(
            setAddTodoForm({
              name: "project_id",
              value: null,
            })
          );
        }}
      >
        <ProjectItemText isSelected={addTodoForm.project_id === null}>
          없음
        </ProjectItemText>
      </ProjectItemComponent>
      {projectList.map((project, index) => {
        const isSelected = project.project_id === addTodoForm.project_id;

        const onPress = () => {
          onPressProjectItem(project)();
        };

        return (
          <ProjectItemComponent
            key={index + project.name}
            isSelected={isSelected}
            onPress={onPress}
          >
            <ProjectItemText isSelected={isSelected}>
              {project.name}
            </ProjectItemText>
          </ProjectItemComponent>
        );
      })}
      {isAddProject && (
        <ProjectItemComponent>
          <TextInput
            ref={textInputRef}
            cursorColor={theme.text}
            style={{
              color: theme.text,
            }}
            placeholderTextColor={theme.text}
            value={newProjectInput}
            onChange={onChangeNewProjectName}
            onSubmitEditing={fetchAddProject}
          ></TextInput>
        </ProjectItemComponent>
      )}
      <ProjectItemComponent isSelected={false}>
        <Icons
          type="feather"
          name="plus"
          size={20}
          onPress={onPressAddProjectBtn}
          color={theme.text}
          hitSlop={{
            top: 20,
            bottom: 20,
            left: 20,
            right: 20,
          }}
        />
      </ProjectItemComponent>
    </ProjectItemContainer>
  );
}
