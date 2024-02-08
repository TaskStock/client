import React, { useState } from "react";
import { BlackBtn } from "../../components/atoms/Buttons";
import TextInput from "../../components/atoms/TextInput";
import LoginContainer from "../../components/molecules/Login/LoginContainer";
import { spacing } from "../../constants/spacing";
import { useClient } from "../../hooks/useClient";
import { useAppDispatch, useAppSelect } from "../../store/configureStore.hooks";
import PageHeader from "../../components/molecules/PageHeader";
import styled from "styled-components/native";

const Container = styled.View`
  background-color: ${({ theme }) => theme.box};
  flex: 1;
`;
const ChangePwCheckPwScreen = ({ navigation }) => {
  const [pw, setPw] = useState("");
  const [pwAlert, setPwAlert] = useState("");
  const { email } = useAppSelect((state) => state.user.user);

  const dispatch = useAppDispatch();
  const client = useClient(dispatch);

  const { accessToken } = useAppSelect((state) => state.auth);
  const checkPwInServer = async () => {
    try {
      const res = await client.post(
        "account/setting/confirm/password",
        {
          inputPW: pw,
        },
        { accessToken }
      );
      if (res.result === "success") {
        console.log("비밀번호 일치");
        navigation.navigate("SetNewPw", { email, type: "settings" });
        setPw("");
      } else {
        setPwAlert("비밀번호가 일치하지 않습니다.");
      }
    } catch (e) {
      console.log("비밀번호 틀림", e);
    }
  };

  return (
    <Container>
      <PageHeader title="" />
      <LoginContainer comment="현재 비밀번호를 입력해주세요.">
        <TextInput
          subText="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          value={pw}
          onChangeText={(text) => {
            setPw(text);
            setPwAlert("");
          }}
          alert={!!pwAlert}
          alertText={pwAlert}
          secureTextEntry
        />
        <BlackBtn
          text={"확인"}
          onPress={checkPwInServer}
          style={{ marginBottom: spacing.padding }}
        />
      </LoginContainer>
    </Container>
  );
};

export default ChangePwCheckPwScreen;
