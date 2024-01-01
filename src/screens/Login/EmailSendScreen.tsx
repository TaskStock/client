import React, { useState } from "react";
import Button from "../../components/atoms/Button";
import TextInput from "../../components/atoms/TextInput";
import LoginContainer from "../../components/molecules/Login/LoginContainer";
import { client } from "../../services/api";
import { checkValidEmail } from "../../utils/checkValidEmail";
import { BlackBtn } from "../../components/atoms/Buttons";

const EmailSendScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [emailAlert, setEmailAlert] = useState(false);

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
    <LoginContainer>
      <TextInput
        subText="이메일"
        placeholder="이메일을 입력해주세요"
        value={email}
        onChangeText={setEmail}
        alert={emailAlert}
        alertText={"가입되지 않은 이메일입니다"}
      />
      <BlackBtn text={"인증번호 받기"} onPress={handleSendCode} />
    </LoginContainer>
  );
};

export default EmailSendScreen;
