import React, { useState } from "react";
import { BlackBtn, WhiteBtn } from "../../components/atoms/Buttons";
import TextInput from "../../components/atoms/TextInput";
import LoginContainer from "../../components/molecules/Login/LoginContainer";
import { spacing } from "../../constants/spacing";
import { client } from "../../services/api";
import { checkValidEmail } from "../../utils/checkValidity";

const EmailSendScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [emailAlert, setEmailAlert] = useState("");
  const [sending, setSending] = useState(false);

  const sendMail = async () => {
    setSending(true);
    try {
      const responseData = await client.post("account/sendMail", {
        email: email,
      });

      if (responseData.result === "success") {
        navigation.navigate("EmailCheckCode", {
          email,
          codeId: responseData.codeId,
        });
      } else if (responseData.result === "fail") {
        setEmailAlert("이미 가입된 이메일입니다.");
      } else {
        setEmailAlert("이메일 전송에 실패했습니다.");
      }

      console.log(responseData);
    } catch (error) {
      console.error("[client] 이메일 전송 오류 발생:", error);
      setEmailAlert("이메일 전송 중 오류가 발생했습니다.");
    }
    setSending(false);
  };

  const handleSendCode = () => {
    if (checkValidEmail(email)) {
      sendMail();
    } else {
      setEmailAlert("유효한 이메일 주소를 입력해주세요.");
    }
  };

  return (
    <LoginContainer comment="인증번호를 받을 이메일 주소를 입력해주세요.">
      <TextInput
        subText="이메일"
        placeholder="이메일을 입력해주세요"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailAlert("");
        }}
        alert={!!emailAlert}
        alertText={emailAlert}
      />
      <BlackBtn
        text={"인증번호 받기"}
        onPress={handleSendCode}
        loading={sending}
        style={{ marginBottom: spacing.padding }}
      />
      {emailAlert === "이미 가입된 이메일입니다." && (
        <WhiteBtn
          text={"로그인하기"}
          onPress={() => navigation.navigate("Welcome")}
        />
      )}
    </LoginContainer>
  );
};

export default EmailSendScreen;
