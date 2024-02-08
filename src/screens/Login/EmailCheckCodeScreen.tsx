import React, { createRef, forwardRef, useEffect, useState } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import { BlackBtn } from "../../components/atoms/Buttons";
import FlexBox from "../../components/atoms/FlexBox";
import Text from "../../components/atoms/Text";
import LoginContainer from "../../components/molecules/Login/LoginContainer";
import { spacing } from "../../constants/spacing";
import { client } from "../../services/api";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";

const CodeInputContainer = styled.View`
  flex: 1;
  height: 100%;
`;

const StyledInput = styled(TextInput)`
  height: 50px;
  text-align: center;
  font-size: ${useResponsiveFontSize(32)}px;
  color: ${(props) => props.theme.text};
`;

const CodeInput = forwardRef<TextInput, TextInputProps>((props, ref) => (
  <StyledInput ref={ref} {...props} />
));

const ResendEmail = ({ onPress }) => {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={{ borderBottomColor: "white", borderBottomWidth: 1 }}
      >
        <Text size="sm">인증번호 재전송</Text>
      </TouchableOpacity>

      <View style={{ height: useResponsiveFontSize(27) }} />
    </>
  );
};

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
    .map(() => createRef<TextInput>());
  const email = route.params.email;
  const codeId = route.params.codeId;
  const type = route.params.type; // findPw, register
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);

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

  // 6자리 채워지면 자동 제출
  useEffect(() => {
    setAlert("");
    if (code.join("").length === 6) {
      handleSubmit();
    }
  }, [code]);

  // 예외처리
  // -[x] 코드가 숫자가 아닐 경우
  // -[x] 코드가 6자리가 아닐 경우
  // -[x] 코드가 일치하지 않을 경우
  // -[x] 다른칸부터 입력했을 경우
  // -[x] number-pad에서 backspace를 눌렀을 경우 그 전칸 focus

  const checkCode = async () => {
    try {
      const codeToSend = code.join("");
      const res = await client.post("account/checkCode", {
        codeId: codeId,
        inputCode: parseInt(codeToSend),
      });

      console.log("인증코드 제출: ", res);
      return res;
    } catch (error) {
      console.error("오류 발생:", error);
      // 오류 처리 로직
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (code.join("").length !== 6) {
      setAlert("6자리의 인증코드를 입력해주세요.");
      setLoading(false);
      return;
    }

    const res = await checkCode();
    setLoading(false);
    if (res.result === "success" && type === "register") {
      navigation.navigate("EmailRegister", { email });
    } else if (res.result === "success" && type === "findPw") {
      navigation.navigate("FindPwSetNewPw", { email, type: "login" });
    } else if (res.result === "fail") {
      setAlert("인증번호가 일치하지 않습니다.");
    } else {
      setAlert("인증번호 확인 중 오류가 발생했습니다.");
    }
  };

  return (
    <LoginContainer comment={`${email}(으)로 전송된 코드를 입력해주세요.`}>
      <FlexBox
        gap={10}
        styles={{
          marginBottom: !!alert ? spacing.padding : spacing.gutter,
          width: "90%",
        }}
      >
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
      {!!alert && (
        <View
          style={{
            paddingVertical: useResponsiveFontSize(3),
            width: "90%",
            marginBottom: spacing.padding,
          }}
        >
          <Text size="xs" color={theme.alert}>
            {alert}
          </Text>
        </View>
      )}

      <ResendEmail onPress={() => {}} />
      <BlackBtn text={"다음"} onPress={handleSubmit} loading={loading} />
    </LoginContainer>
  );
};

export default EmailCheckCodeScreen;
