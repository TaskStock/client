import React, { useState } from "react";
import { BlackBtn } from "../../components/atoms/Buttons";
import TextInput from "../../components/atoms/TextInput";
import LoginContainer from "../../components/molecules/Login/LoginContainer";
import { spacing } from "../../constants/spacing";

const FindPWChangeScreen = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (text) => {
    setPassword(text);
  };
  return (
    <LoginContainer comment="새 비밀번호를 입력해주세요.">
      <TextInput
        subText={"비밀번호"}
        placeholder="새로운 비밀번호를 입력해주세요"
        value={password}
        onChangeText={handleChange}
        secureTextEntry
        alertText={
          "해당 비밀번호를 사용할 수 없습니다. (영어 대소문자, 숫자, 특수문자 포함 8자 이상)"
        }
      />
      <TextInput
        subText={"비밀번호 확인"}
        placeholder="새로운 비밀번호를 다시 입력해주세요"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        alertText={
          "비밀번호가 일치하지 않습니다. (영어 대소문자, 숫자, 특수문자 포함 8자 이상)"
        }
      />
      <BlackBtn
        text={"확인"}
        onPress={() => {}}
        style={{ marginTop: spacing.padding }}
        // loading={loading}
      />
    </LoginContainer>
  );
};

export default FindPWChangeScreen;
