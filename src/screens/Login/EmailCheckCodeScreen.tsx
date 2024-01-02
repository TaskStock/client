import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../../components/atoms/Button";
import styled from "styled-components/native";
import TextInput from "../../components/atoms/TextInput";
import LoginContainer from "../../components/molecules/Login/LoginContainer";
import { BlackBtn } from "../../components/atoms/Buttons";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const EmailCheckCodeScreen = ({ route, navigation }) => {
  const [code, setCode] = useState("");
  const email = route.params.email;
  const codeId = route.params.codeId;

  const checkCode = async () => {
    try {
      const url = "http://localhost:8000/account/checkCode";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codeId: codeId, inputCode: code }),
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("오류 발생:", error);
      // 오류 처리 로직
    }
  };

  return (
    <LoginContainer comment={`${email}(으)로 전송된 코드를 입력해주세요.`}>
      <TextInput
        subText="인증번호"
        placeholder="인증번호를 입력해주세요"
        value={code}
        onChangeText={setCode}
      />

      <BlackBtn
        text={"다음"}
        onPress={() => {
          checkCode();
          navigation.navigate("EmailRegister", { email });
        }}
      />
    </LoginContainer>
  );
};

export default EmailCheckCodeScreen;
