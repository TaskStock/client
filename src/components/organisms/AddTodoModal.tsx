import { Pressable, ScrollView, TextInput, View } from "react-native";
import React from "react";
import styled, { useTheme } from "styled-components/native";
import { spacing } from "../../constants/spacing";
import Margin from "../atoms/Margin";
import Icons from "../atoms/Icons";
import Text from "../atoms/Text";
import Slider from "@react-native-community/slider";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import { useDispatch } from "react-redux";
import { toggleAddModal } from "../../store/modules/todo";

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
  gap: ${spacing.offset}px;
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

const Section = ({
  header,
  children,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <View>
      {header}
      <Margin margin={10}></Margin>
      {children}
    </View>
  );
};

const ProjectItemComponent = ({
  isSelected,
  onPress,
  name,
}: {
  isSelected?: boolean;
  onPress: () => void;
  name: string;
}) => {
  const theme = useTheme();

  return (
    <Pressable onPress={onPress}>
      <ProjectItem isSelected={isSelected}>
        <Text size="md" color={isSelected ? theme.textReverse : theme.text}>
          {name}
        </Text>
      </ProjectItem>
    </Pressable>
  );
};

const tempProjectList = [
  {
    name: "프로젝트1",
    isSelected: true,
  },
  {
    name: "토익",
    isSelected: false,
  },
  {
    name: "프로그래밍",
    isSelected: false,
  },
  {
    name: "태스크스탁",
    isSelected: false,
  },
  {
    name: "프로그래밍",
    isSelected: false,
  },
  {
    name: "태스크스탁",
    isSelected: false,
  },
];

export default function AddTodoModal() {
  const theme = useTheme();
  const [value, setValue] = React.useState(1000);
  const [selectedProject, setSelectedProject] = React.useState(0);
  const dispatch = useDispatch();

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
          <AddTodoContents>
            <Section
              header={
                <SectionHeader>
                  <SectionHeaderText>할 일</SectionHeaderText>
                </SectionHeader>
              }
            >
              <TodoInput placeholder="할 일을 입력해주세요."></TodoInput>
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
                minimumValue={1000}
                maximumValue={10000}
                onValueChange={(value) => setValue(value)}
                minimumTrackTintColor={theme.text}
                step={1000}
              />
            </Section>
            <Section
              header={
                <SectionHeader>
                  <SectionHeaderText>프로젝트</SectionHeaderText>
                </SectionHeader>
              }
            >
              <ScrollView
                style={{
                  height: 110,
                }}
              >
                <ProjectItemContainer>
                  {tempProjectList.map((project, index) => {
                    const isSelected = index === selectedProject;

                    return (
                      <ProjectItemComponent
                        key={index + project.name}
                        isSelected={isSelected}
                        name={project.name}
                        onPress={() => {
                          setSelectedProject(index);
                        }}
                      />
                    );
                  })}
                </ProjectItemContainer>
              </ScrollView>
            </Section>
          </AddTodoContents>
          <AddTodoBtn
            onPress={() => {
              dispatch(toggleAddModal());
            }}
          >
            <Text size="md">할 일 추가하기</Text>
          </AddTodoBtn>
        </AddTodoBox>
      </InnerPressable>
    </AddTodoOverlay>
  );
}
