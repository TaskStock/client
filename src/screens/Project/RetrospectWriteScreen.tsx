import { ScrollView, View } from "react-native";
import React from "react";
import styled, { useTheme } from "styled-components/native";
import PageHeader from "../../components/molecules/PageHeader";
import ContentLayout from "../../components/atoms/ContentLayout";
import { spacing } from "../../constants/spacing";
import Section from "../../components/molecules/Section";
import FlexBox from "../../components/atoms/FlexBox";
import {
  TextAreaInput,
  TextInputWithBorder,
} from "../../components/atoms/TextInput";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import Margin from "../../components/atoms/Margin";
import { BlackBtnForProject, GrayBtn } from "../../components/atoms/Buttons";
import { useProject } from "../../hooks/useProject";
import RoundItemBtn, {
  RoundItemBtnContainer,
} from "../../components/atoms/RoundItemBtn";
import Text from "../../components/atoms/Text";
import { useRetrospectForm } from "../../hooks/useRetrospectForm";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { showErrorToast } from "../../utils/showToast";

const NormalSection = ({ headerText, children }) => {
  return (
    <Section
      gapSize="xl"
      header={
        <Section.Header>
          <Section.HeaderText isMainText>{headerText}</Section.HeaderText>
        </Section.Header>
      }
    >
      {children}
    </Section>
  );
};

export default function RetrospectWriteScreen() {
  const theme = useTheme();

  const { projects } = useProject();

  const navigation = useNavigation();

  const {
    retrospectForm,
    retrospectDate,
    isEdit,
    onChangeDate,
    onChangeProjectId,
    onAddRetrospect,
    onDeleteRetrospect,
    onUpdateRetrospect,
    onChangeRetrospectContent,
  } = useRetrospectForm();

  const onPressSave = () => {
    if (retrospectForm.content === "") {
      showErrorToast("내용을 입력해주세요");
      return;
    }

    if (!retrospectForm.project_id) {
      showErrorToast("프로젝트를 선택해주세요");
      return;
    }

    if (isEdit) onUpdateRetrospect();
    else onAddRetrospect();

    navigation.goBack();
  };

  const onPressDelete = () => {
    onDeleteRetrospect();
    navigation.goBack();
  };

  const retrospectDateFormat = dayjs(retrospectDate).format("YYYY년 MM월 DD일");

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.box,
      }}
    >
      <PageHeader />
      <ScrollView style={{ flex: 1 }}>
        <ContentLayout>
          <FlexBox direction="column" gap={spacing.offset} alignItems="stretch">
            <NormalSection headerText="기록 날짜">
              <TextInputWithBorder
                value={retrospectDateFormat}
              ></TextInputWithBorder>
            </NormalSection>
            <NormalSection headerText="내용">
              <TextAreaInput
                numberOfLines={15}
                minHeight={useResponsiveFontSize(260)}
                placeholder="내용을 입력해주세요"
                value={retrospectForm.content}
                onChangeText={onChangeRetrospectContent}
              ></TextAreaInput>
            </NormalSection>
            <NormalSection headerText="프로젝트">
              <RoundItemBtnContainer>
                {projects.map((project) => {
                  return (
                    <RoundItemBtn
                      onPress={() => {
                        onChangeProjectId(project.project_id);
                      }}
                      key={project.project_id}
                      isSelected={
                        project.project_id === retrospectForm.project_id
                      }
                    >
                      <Text
                        size="sm"
                        color={
                          // project.project_id === retrospectForm.project_id
                          //   ? theme.textReverse
                          //   : theme.text
                          theme.name === "gray"
                            ? project.project_id === retrospectForm.project_id
                              ? theme.textReverse
                              : theme.text
                            : theme.text
                        }
                      >
                        {project.name}
                      </Text>
                    </RoundItemBtn>
                  );
                })}
              </RoundItemBtnContainer>
            </NormalSection>
          </FlexBox>
          <Margin margin={useResponsiveFontSize(50)} />
          <FlexBox gap={spacing.padding}>
            <BlackBtnForProject
              text="저장하기"
              onPress={onPressSave}
              style={{ flex: 3 }}
            ></BlackBtnForProject>
            {isEdit && (
              <GrayBtn
                text="삭제"
                onPress={onPressDelete}
                style={{ flex: 1 }}
              ></GrayBtn>
            )}
          </FlexBox>
        </ContentLayout>
      </ScrollView>
    </View>
  );
}
