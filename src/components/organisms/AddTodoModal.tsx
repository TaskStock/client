import { Pressable, ScrollView, TextInput, View } from "react-native";
import React, { useCallback, useEffect } from "react";
import styled, { useTheme } from "styled-components/native";
import { spacing } from "../../constants/spacing";
import Margin from "../atoms/Margin";
import Icons from "../atoms/Icons";
import Text from "../atoms/Text";
import Slider from "@react-native-community/slider";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import { useDispatch } from "react-redux";
import { toggleAddModal } from "../../store/modules/todo";
import SliderThumb from "../../../assets/images/slider-thumb.png";
import { useProject } from "../../hooks/useProject";

const AddTodoOverlay = styled.Pressable`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerPressable = styled.Pressable`
  width: 85%;
  height: 50%;
`;

const AddTodoBox = styled.View`
  height: 100%;
  border-radius: 20px;
  padding: ${spacing.offset}px;
  background-color: ${({ theme }) => theme.palette.neutral100_gray};
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.25;
  shadow-radius: 20px;
  elevation: 5;
`;

const AddTodoContents = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const AddTodoBtn = styled.TouchableOpacity`
  border-radius: 8px;
  padding: 14px 75px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.palette.neutral200_gray};
`;

const CloseBox = styled.View`
  display: flex;
  align-items: flex-end;
`;

const ProjectItemContainer = styled.View`
  flex: 1;
  display: flex;
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
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.mainBtnReversed : theme.mainBtnGray};
  border-radius: 20px;
`;

const SectionHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;
`;

const SectionHeaderText = styled.Text`
  font-size: ${useResponsiveFontSize(18)}px;
  color: ${({ theme }) => theme.textDim};
`;

const ValueText = styled(SectionHeaderText)`
  color: ${({ theme }) => theme.palette.red};
`;

const TodoInput = styled.TextInput`
  border-color: ${({ theme }) => theme.textDimmer};
  border-bottom-width: 1px;
  padding: 6px 1px;
`;

const SliderLabel = styled.View`
  position: absolute;
  width: 100%;
  bottom: -10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SliderLabelText = styled.Text`
  position: relative;
  top: -5px;
  font-size: ${useResponsiveFontSize(12)}px;
  color: ${({ theme }) => theme.textDim};
`;

const SliderGrid = styled.View`
  width: 3px;
  height: 10px;
  background-color: ${({ theme }) => theme.mainBtnGray};
  pointer-events: none;
  z-index: -1;
`;

const Section = ({
  header,
  children,
  margin,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
  margin?: number;
}) => {
  return (
    <View>
      {header}
      <Margin margin={margin ? margin : 5}></Margin>
      {children}
    </View>
  );
};

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

export default function AddTodoModal({}) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const scrollViewRef = React.useRef<ScrollView>(null);

  const [addTodoForm, setAddTodoForm] = React.useState({
    title: "",
    level: 0,
    project_id: null,
  });

  const value = addTodoForm.level * 1000;

  const {
    projectList,
    isAddProject,
    newProjectInput,
    setIsAddProject,
    onChangeNewProjectName,
    fetchAddProject,
  } = useProject();

  const onPressProjectItem = useCallback(
    (project) => () => {
      setAddTodoForm({
        ...addTodoForm,
        project_id: project.id,
      });
    },
    [addTodoForm]
  );

  const onPressAddTodoBtn = useCallback(() => {
    // TODO: 백으로 todo 추가 API 콜.

    dispatch(toggleAddModal());
  }, []);

  const onPressAddProjectBtn = () => {
    setIsAddProject((prev) => !prev);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd();
    }, 100);
  };

  const onChangeSliderValue = (value: number) => {
    const level = value > 0 ? Math.floor(value / 1000) : 0;

    setAddTodoForm({
      ...addTodoForm,
      level: level,
    });
  };

  return (
    <AddTodoOverlay
      onPress={() => {
        dispatch(toggleAddModal());
      }}
    >
      <InnerPressable>
        <AddTodoBox>
          <CloseBox>
            <Icons
              onPress={() => {
                dispatch(toggleAddModal());
              }}
              type="ionicons"
              name="close"
              size={30}
            />
          </CloseBox>
          <ScrollView
            style={{
              marginBottom: spacing.offset,
            }}
            ref={(ref) => (scrollViewRef.current = ref)}
          >
            <AddTodoContents>
              <Section
                header={
                  <SectionHeader>
                    <SectionHeaderText>할 일</SectionHeaderText>
                  </SectionHeader>
                }
              >
                <TodoInput
                  placeholder="할 일을 입력해주세요."
                  onChange={(e) => {
                    setAddTodoForm({
                      ...addTodoForm,
                      title: e.nativeEvent.text,
                    });
                  }}
                ></TodoInput>
              </Section>
              <Section
                header={
                  <SectionHeader>
                    <SectionHeaderText>가치</SectionHeaderText>
                    <ValueText>{value}원</ValueText>
                  </SectionHeader>
                }
              >
                <Slider
                  minimumValue={0}
                  maximumValue={5000}
                  onValueChange={onChangeSliderValue}
                  minimumTrackTintColor={theme.text}
                  maximumTrackTintColor={theme.mainBtnGray}
                  step={1000}
                  tapToSeek={true}
                  thumbImage={SliderThumb}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    // paddingHorizontal: 5,
                    // zIndex: -2,
                  }}
                >
                  <SliderGrid />
                  <SliderGrid />
                  <SliderGrid />
                  <SliderGrid />
                  <SliderGrid />
                  <SliderGrid />
                  <SliderLabel>
                    <SliderLabelText>0</SliderLabelText>
                    <SliderLabelText>5000</SliderLabelText>
                  </SliderLabel>
                </Slider>
              </Section>

              <Section
                margin={10}
                header={
                  <SectionHeader>
                    <SectionHeaderText>프로젝트</SectionHeaderText>
                  </SectionHeader>
                }
              >
                <ProjectItemContainer>
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
              </Section>
            </AddTodoContents>
          </ScrollView>
          <AddTodoBtn onPress={onPressAddTodoBtn}>
            <Text size="md">할 일 추가하기</Text>
          </AddTodoBtn>
        </AddTodoBox>
      </InnerPressable>
    </AddTodoOverlay>
  );
}
