import { View } from "react-native";
import React from "react";
import styled, { useTheme } from "styled-components/native";
import PageHeader from "../../components/molecules/PageHeader";
import ContentLayout from "../../components/atoms/ContentLayout";
import { spacing } from "../../constants/spacing";
import Section from "../../components/molecules/Section";
import FlexBox from "../../components/atoms/FlexBox";
import DateTimePicker from "@react-native-community/datetimepicker";
import TextInput, {
  TextAreaInput,
  TextInputWithBorder,
} from "../../components/atoms/TextInput";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import Margin from "../../components/atoms/Margin";
import { BlackBtnForProject, GrayBtn } from "../../components/atoms/Buttons";
import BorderBox from "../../components/atoms/BorderBox";
import dayjs from "dayjs";
import { useProject } from "../../hooks/useProject";
import RoundItemBtn, {
  RoundItemBtnContainer,
} from "../../components/atoms/RoundItemBtn";
import Text from "../../components/atoms/Text";

const DatePickerBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

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

  const datePickerInitialDate = new Date();

  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;

    const formattedDate = dayjs(currentDate).format("YYYY-MM-DD");
  };

  const { projects } = useProject();

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
          <NormalSection headerText="회고 날짜">
            <DatePickerBox>
              <DateTimePicker
                value={datePickerInitialDate}
                mode="date"
                display="default"
                onChange={onChangeDate}
                style={{
                  bottom: 0,
                  left: -10,
                }}
              ></DateTimePicker>
            </DatePickerBox>
          </NormalSection>
          <NormalSection headerText="회고 내용">
            <TextAreaInput
              numberOfLines={50}
              minHeight={useResponsiveFontSize(100)}
              placeholder="회고 내용을 입력해주세요"
            ></TextAreaInput>
          </NormalSection>
          <NormalSection headerText="프로젝트">
            <RoundItemBtnContainer>
              {projects.map((project) => {
                return (
                  <RoundItemBtn key={project.project_id}>
                    <Text size="md">{project.name}</Text>
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
            onPress={() => {}}
            style={{ flex: 3 }}
          ></BlackBtnForProject>
        </FlexBox>
      </ContentLayout>
    </View>
  );
}
