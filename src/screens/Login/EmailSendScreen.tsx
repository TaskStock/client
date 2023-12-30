import React, { useEffect, useState } from "react";
import { TextInput } from "react-native";
import styled from "styled-components/native";
import Button from "../../components/atoms/Button";
import { checkValidEmail } from "../../utils/checkValidEmail";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const EmailSendScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const sendMail = async () => {
    try {
      const url = "http://localhost:8000/account/sendMail";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("네트워크 응답이 올바르지 않습니다.");
      }

      const responseData = await response.json();

      if (responseData.result === "success") {
        navigation.navigate("EmailCheckCode", {
          email,
          codeId: responseData.codeId,
        });
      } else {
        alert("이메일 전송에 실패했습니다."); // 혹은 다른 오류 처리
      }

      console.log(responseData);
    } catch (error) {
      console.error("오류 발생:", error);
      // 오류 처리 로직
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
