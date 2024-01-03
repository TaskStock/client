import React, { createRef, useEffect, useState } from "react";
import styled from "styled-components/native";
import { BlackBtn } from "../../components/atoms/Buttons";
import FlexBox from "../../components/atoms/FlexBox";
import LoginContainer from "../../components/molecules/Login/LoginContainer";
import { spacing } from "../../constants/spacing";

const CodeInput = styled.TextInput<{ focused: boolean }>`
  border-bottom-width: 2px;
  border-bottom-color: ${(props) =>
    props.focused ? props.theme.high : props.theme.text};
  flex: 1;
  height: 50px;
  text-align: center;
`;

const EmailCheckCodeScreen = ({ route, navigation }) => {
  const [code, setCode] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = Array(6)
    .fill(null)
    .map(() => createRef());
  const [focusedInputIndex, setFocusedInputIndex] = useState<number | null>(
    null
  );
  // const email = route.params.email;
  const email = "hwanheejung117@gmail.com";
  // const codeId = route.params.codeId;
  const codeId = 1;

  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);

  useEffect(() => {
    console.log(code);
  }, [code]);

  const handleInputChange = (text: string, index: number) => {
    // (숫자만 입력 가능) 숫자가 아니면 무시
    if (!text.match(/^[0-9]$/)) {
      return;
    }

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // 다음 입력 박스로 포커스 이동
    if (text && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };
  const handleBackspace = (key: string, index: number) => {
    if (key === "Backspace" && index > 0 && code[index] === "") {
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      // 이전 입력 박스로 포커스 이동
      inputRefs[index - 1].current?.focus();
    }
  };

  // 예외처리
  // -[x] 코드가 숫자가 아닐 경우
  // -[] 코드가 6자리가 아닐 경우
  // -[] 코드가 일치하지 않을 경우
  // -[] 다른칸부터 입력했을 경우
  // -[x] number-pad에서 backspace를 눌렀을 경우 그 전칸 focus =>

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
      <FlexBox gap={10} styles={{ marginBottom: spacing.gutter }}>
        {code.map((digit, index) => (
          <CodeInput
            key={index}
            keyboardType="number-pad"
            maxLength={1}
            ref={inputRefs[index]}
            onKeyPress={({ nativeEvent }) => {
              handleBackspace(nativeEvent.key, index);
            }}
            onChangeText={(text) => handleInputChange(text, index)}
            value={digit}
            onFocus={() => setFocusedInputIndex(index)}
            onBlur={() => setFocusedInputIndex(null)}
            focused={focusedInputIndex === index}
          />
        ))}
      </FlexBox>

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
