import React, { createRef, useEffect, useState } from "react";
import styled from "styled-components/native";
import { BlackBtn } from "../../components/atoms/Buttons";
import FlexBox from "../../components/atoms/FlexBox";
import LoginContainer from "../../components/molecules/Login/LoginContainer";
import { spacing } from "../../constants/spacing";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";

const CodeInputContainer = styled.View`
  flex: 1;
  height: 100%;
`;
const CodeInput = styled.TextInput`
  height: 50px;
  text-align: center;
  font-size: ${useResponsiveFontSize(32)}px;
`;
const BorderBottom = styled.View<{ hasContent: boolean }>`
  height: ${spacing.small}px;
  background-color: ${(props) =>
    props.hasContent ? props.theme.high : props.theme.textDimmer};
  border-radius: ${spacing.padding}px;
`;
const EmailCheckCodeScreen = ({ route, navigation }) => {
  const [code, setCode] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = Array(6)
    .fill(null)
    .map(() => createRef());
  const email = route.params.email;
  const codeId = route.params.codeId;

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
    if (key === "Backspace") {
      if (index > 0 && code[index] === "") {
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
        inputRefs[index - 1].current?.focus();
      } else if (code[index] !== "") {
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
        if (index > 0) {
          inputRefs[index - 1].current?.focus();
        }
      }
    }
  };

  // 예외처리
  // -[x] 코드가 숫자가 아닐 경우
  // -[] 코드가 6자리가 아닐 경우
  // -[] 코드가 일치하지 않을 경우
  // -[x] 다른칸부터 입력했을 경우
  // -[x] number-pad에서 backspace를 눌렀을 경우 그 전칸 focus =>

  const checkCode = async () => {
    try {
      const url = "http://localhost:8000/account/checkCode";
      const codeToSend = code.join("");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codeId: codeId,
          inputCode: parseInt(codeToSend),
        }),
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
      <FlexBox gap={10} styles={{ marginBottom: spacing.gutter, width: "90%" }}>
        {code.map((digit, index) => (
          <CodeInputContainer key={index}>
            <CodeInput
              keyboardType="number-pad"
              maxLength={1}
              ref={inputRefs[index]}
              onKeyPress={({ nativeEvent }) => {
                handleBackspace(nativeEvent.key, index);
              }}
              onChangeText={(text) => handleInputChange(text, index)}
              value={digit}
            />
            <BorderBottom hasContent={digit.length > 0} />
          </CodeInputContainer>
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
