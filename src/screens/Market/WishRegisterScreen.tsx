import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import PageHeader from "../../components/molecules/PageHeader";
import Section from "../../components/molecules/Section";
import Margin from "../../components/atoms/Margin";
import { spacing } from "../../constants/spacing";
import ContentLayout from "../../components/atoms/ContentLayout";
import { TextAreaInput } from "../../components/atoms/TextInput";
import { BlackBtn } from "../../components/atoms/Buttons";

export default function WishRegisterScreen() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <PageHeader title="위시종목 등록"></PageHeader>
      <Margin margin={spacing.offset} />
      <ContentLayout>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Section.HeaderText size={20} isMainText={true}>
            추가되었으면 하는 종목을 알려주세요!
          </Section.HeaderText>
          <Margin margin={spacing.padding} />
          <Section.HeaderSubText size={15}>
            태스팀 검토 후 장에 등록되면
          </Section.HeaderSubText>
          <Margin margin={spacing.small * 0.5} />
          <Section.HeaderSubText size={15}>
            알림으로 알려드릴게요.
          </Section.HeaderSubText>
          <Margin margin={spacing.gutter} />
          <TextAreaInput placeholder="종목명을 입력해주세요" minHeight={100} />
          <Margin margin={50} />
          <BlackBtn text="등록하기" onPress={() => {}} />
        </KeyboardAvoidingView>
      </ContentLayout>
    </View>
  );
}
