import { View, Text } from "react-native";
import React from "react";
import PageHeader from "../../components/molecules/PageHeader";
import Section from "../../components/molecules/Section";
import ContentLayout from "../../components/atoms/ContentLayout";
import { TextInputWithBorder } from "../../components/atoms/TextInput";
import FlexBox from "../../components/atoms/FlexBox";
import { spacing } from "../../constants/spacing";
import RoundItemBtn from "../../components/atoms/RoundItemBtn";
import Margin from "../../components/atoms/Margin";
import {
  BlackBtn,
  BlackBtnForProject,
  GrayBtn,
  WhiteBtn,
} from "../../components/atoms/Buttons";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import { useTheme } from "styled-components/native";

export default function ProjectManageScreen() {
  const theme = useTheme();
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
          <Section
            header={
              <Section.Header>
                <Section.HeaderText>프로젝트 이름</Section.HeaderText>
              </Section.Header>
            }
          >
            <TextInputWithBorder placeholder="프로젝트 이름을 입력하세요"></TextInputWithBorder>
          </Section>
          <Section
            header={
              <Section.Header>
                <Section.HeaderText isMainText>공개설정</Section.HeaderText>
              </Section.Header>
            }
            gapSize="lg"
          >
            <FlexBox direction="row" gap={spacing.padding}>
              <RoundItemBtn>
                <Text>공개설정</Text>
              </RoundItemBtn>
              <RoundItemBtn>
                <Text>공개설정</Text>
              </RoundItemBtn>
              <RoundItemBtn>
                <Text>공개설정</Text>
              </RoundItemBtn>
            </FlexBox>
          </Section>
          <Section
            gapSize="lg"
            header={
              <Section.Header>
                <Section.HeaderText isMainText>완료여부</Section.HeaderText>
              </Section.Header>
            }
          >
            <FlexBox direction="row" gap={spacing.padding}>
              <RoundItemBtn>
                <Text>진행중</Text>
              </RoundItemBtn>
              <RoundItemBtn>
                <Text>완료</Text>
              </RoundItemBtn>
            </FlexBox>
          </Section>
        </FlexBox>
        <Margin margin={useResponsiveFontSize(100)} />
        <FlexBox gap={spacing.padding}>
          <BlackBtnForProject
            text="확인"
            onPress={() => {}}
            style={{ flex: 3 }}
          ></BlackBtnForProject>
          <GrayBtn
            text="삭제"
            onPress={() => {}}
            style={{
              flex: 1,
            }}
          ></GrayBtn>
        </FlexBox>
      </ContentLayout>
    </View>
  );
}
