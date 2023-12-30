import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../../components/atoms/Button";
import styled from "styled-components/native";

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
    <Container>
      <TextInput
        placeholder="인증번호를 입력해주세요"
        value={code}
        onChangeText={setCode}
      />
      <Button
        text={"다음"}
        onPress={() => {
          checkCode();
          navigation.navigate("EmailRegister", { email });
        }}
      />
    </Container>
  );
};

export default EmailCheckCodeScreen;
