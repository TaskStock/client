import React, { useCallback, useEffect } from "react";
import { Pressable, ScrollView, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import styled, { useTheme } from "styled-components/native";
import { useProject } from "../../../hooks/useProject";
import { useAppSelect } from "../../../store/configureStore.hooks";
import { setAddTodoForm } from "../../../store/modules/todo";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import Icons from "../../atoms/Icons";

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
  flex-direction: row;
  padding: 9px 20px;
  height: 36px;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.mainBtnReversed : theme.mainBtnGray};
  border-radius: 20px;
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

  return (
    <Pressable onPress={onPress}>
      <ProjectItem isSelected={isSelected}>{children}</ProjectItem>
    </Pressable>
  );
};

const ProjectItemText = styled.Text<{ isSelected?: boolean }>`
  font-size: ${useResponsiveFontSize(18)}px;
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.textReverse : theme.text};
`;

export default function ProjectItemList({
  scrollViewRef,
}: {
  scrollViewRef: React.RefObject<ScrollView>;
}) {
  const {
    projectList,
    isAddProject,
    newProjectInput,
    setIsAddProject,
    onChangeNewProjectName,
    fetchAddProject,
  } = useProject();

  const dispatch = useDispatch();

  const addTodoForm = useAppSelect((state) => state.todo.addTodoForm);

  const onPressProjectItem = useCallback(
    (project) => () => {
      dispatch(setAddTodoForm({ name: "project_id", value: project.id }));
    },
    [addTodoForm]
  );

  const [projectContainerHeight, setProjectContainerHeight] = React.useState(0);

  const onLayoutProjectContainer = (e) => {
    if (projectContainerHeight == 0) {
      setProjectContainerHeight(e.nativeEvent.layout.height);
    }
  };

  const projectContainerRef = React.useRef<View>(null);

  const onPressAddProjectBtn = () => {
    setIsAddProject((prev) => {
      return !prev;
    });
  };

  useEffect(() => {
    if (isAddProject) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [isAddProject]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     projectContainerRef.current?.measure((x, y, width, height) => {
  //       console.log("height: ", height);

  //       setProjectContainerHeight(height);
  //     });
  //   }, 1000);

  //   // if (projectContainerHeight == 0) return;

  //   // if (isAddProject) {
  //   //   setProjectContainerHeight((prev) => {
  //   //     return prev + 50;
  //   //   });
  //   // } else {
  //   //   setProjectContainerHeight((prev) => {
  //   //     return prev - 50;
  //   //   });
  //   // }

  //   setTimeout(() => {
  //     scrollViewRef.current?.scrollToEnd({ animated: true });
  //   }, 100);
  // }, [isAddProject]);

  return (
    <ProjectItemContainer
      height={projectContainerHeight}
      onLayout={onLayoutProjectContainer}
      ref={projectContainerRef}
    >
      {projectList.map((project, index) => {
        const isSelected = project.id === addTodoForm.project_id;

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
            placeholder="프로젝트 이름을 입력해주세요."
            style={{
              width: 180,
            }}
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
