import { View } from "react-native";
import React from "react";
import PageHeader from "../../components/molecules/PageHeader";
import Section from "../../components/molecules/Section";
import ContentLayout from "../../components/atoms/ContentLayout";
import { TextInputWithBorder } from "../../components/atoms/TextInput";
import FlexBox from "../../components/atoms/FlexBox";
import { spacing } from "../../constants/spacing";
import RoundItemBtn from "../../components/atoms/RoundItemBtn";
import Margin from "../../components/atoms/Margin";
import { BlackBtnForProject, GrayBtn } from "../../components/atoms/Buttons";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import { useTheme } from "styled-components/native";
import { useProjectForm } from "../../hooks/useProjectForm";
import Text from "../../components/atoms/Text";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ProjectStackParamList } from "../../navigators/ProjectStack";

const ProjectSection = ({
  headerText,
  children,
}: {
  headerText: string;
  children: React.ReactNode;
}) => {
  return (
    <Section
      header={
        <Section.Header>
          <Section.HeaderText>{headerText}</Section.HeaderText>
        </Section.Header>
      }
      gapSize="lg"
    >
      {children}
    </Section>
  );
};

const publicType = [
  {
    name: "전체공개",
    value: "all",
  },
  {
    name: "팔로워",
    value: "followers",
  },
  {
    name: "비공개",
    value: "hidden",
  },
];

const progressType = [
  {
    name: "진행중",
    value: "progress",
  },
  {
    name: "완료",
    value: "complete",
  },
];

export default function ProjectManageScreen() {
  const theme = useTheme();

  const navigation = useNavigation<NavigationProp<ProjectStackParamList>>();

  const {
    form,
    isEditMode,
    onChangeProjectName,
    onChangeProjectPublic,
    onChangeProjectProgress,
    onSubmit,
    onRemove,
  } = useProjectForm();

  const onPressSubmitBtn = () => {
    onSubmit();
    navigation.goBack();
  };

  const onPressDeleteBtn = () => {
    onRemove();
    navigation.goBack();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.box,
      }}
    >
      <PageHeader />
      <ContentLayout>
        <FlexBox direction="column" gap={spacing.offset} alignItems="stretch">
          <ProjectSection headerText="프로젝트 이름">
            <TextInputWithBorder
              value={form.name}
              onChangeText={onChangeProjectName}
              placeholder="프로젝트 이름을 입력하세요"
            ></TextInputWithBorder>
          </ProjectSection>
          <ProjectSection headerText="공개설정">
            <FlexBox direction="row" gap={spacing.padding}>
              {publicType.map((item) => (
                <RoundItemBtn
                  key={item.value}
                  onPress={() => onChangeProjectPublic(item.value)}
                  isSelected={form.ispublic === item.value ? true : false}
                >
                  <Text
                    size="md"
                    color={
                      form.ispublic === item.value
                        ? theme.textReverse
                        : theme.text
                    }
                  >
                    {item.name}
                  </Text>
                </RoundItemBtn>
              ))}
            </FlexBox>
          </ProjectSection>
          <ProjectSection headerText="완료여부">
            <FlexBox direction="row" gap={spacing.padding}>
              {progressType.map((item) => (
                <RoundItemBtn
                  key={item.value}
                  onPress={() => onChangeProjectProgress(item.value)}
                  isSelected={false}
                >
                  <Text size="md" color={theme.text}>
                    {item.name}
                  </Text>
                </RoundItemBtn>
              ))}
            </FlexBox>
          </ProjectSection>
        </FlexBox>
        <Margin margin={useResponsiveFontSize(100)} />
        <FlexBox gap={spacing.padding}>
          <BlackBtnForProject
            text="확인"
            onPress={onPressSubmitBtn}
            style={{ flex: 3 }}
          ></BlackBtnForProject>
          {isEditMode && (
            <GrayBtn
              text="삭제"
              onPress={onPressDeleteBtn}
              style={{
                flex: 1,
              }}
            ></GrayBtn>
          )}
        </FlexBox>
      </ContentLayout>
    </View>
  );
}
