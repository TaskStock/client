import React, { useState } from "react";
import { TextInput } from "react-native";
import styled from "styled-components/native";
import Button from "../../components/atoms/Button";
import { checkValidEmail } from "../../utils/checkValidEmail";
import { client } from "../../services/api";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const EmailSendScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const sendMail = async () => {
    try {
      const responseData = await client.post("account/sendMail", {
        email: email,
      });

      if (responseData.result === "success") {
        navigation.navigate("EmailCheckCode", {
          email,
          codeId: responseData.codeId,
        });
      } else {
        alert("이메일 전송에 실패했습니다.");
      }

      console.log(responseData);
    } catch (error) {
      console.error("[client] 이메일 전송 오류 발생:", error);
    }
  };

  const handleSendCode = () => {
    if (checkValidEmail(email)) {
      sendMail();
    } else {
      alert("유효한 이메일 주소를 입력해주세요.");
    }
  };

  return (
    <Container>
      <TextInput
        placeholder="이메일을 입력해주세요"
        value={email}
        onChangeText={setEmail}
      />
      <Button text={"인증번호 받기"} onPress={handleSendCode} />
    </Container>
  );
};

export default EmailSendScreen;
