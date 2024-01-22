import React from "react";
import { View } from "react-native";
import PageHeader from "../../components/molecules/PageHeader";
import SetPrivate from "../../components/molecules/Settings/SetPrivate";
import { Menu } from "./SettingsHomeScreen";
import styled from "styled-components/native";
import { spacing } from "../../constants/spacing";

const Container = styled.View`
  padding: ${spacing.offset}px;
`;

const AccountScreen = () => {
  return (
    <View>
      <PageHeader title="계정 설정" />
      <Container>
        <SetPrivate />

        <Menu text="비밀번호 재설정 =>" onPress={() => {}} />
        <Menu text="회원 탈퇴 =>" onPress={() => {}} />
      </Container>
    </View>
  );
};

export default AccountScreen;
