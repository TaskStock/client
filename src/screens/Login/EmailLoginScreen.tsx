import React, { useState } from "react";
import styled from "styled-components/native";
import Button from "../../components/atoms/Button";
import TextInput from "../../components/atoms/TextInput";
import { spacing } from "../../constants/spacing";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${spacing.gutter}px;
  background-color: white;
`;

const EmailLoginScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [emailAlert, setEmailAlert] = useState(false);
  const [pwAlert, setPwAlert] = useState(false);

  const handleChange = (name: string, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <Container>
      <TextInput
        subText={"이메일"}
        placeholder="이메일을 입력해주세요"
        value={user.email}
        onChangeText={(text) => handleChange("email", text)}
        alert={emailAlert}
        alertText={"가입되지 않은 이메일입니다"}
      />
      <TextInput
        subText={"비밀번호"}
        placeholder="비밀번호를 입력해주세요"
        value={user.password}
        onChangeText={(text) => handleChange("password", text)}
        alert={pwAlert}
        alertText={
          "비밀번호가 일치하지 않습니다. (영어 대소문자, 숫자, 특수문자 포함 8자 이상)"
        }
        secureTextEntry
      />
      <Button text={"로그인"} onPress={() => {}} />
      <Button
        text={"회원가입"}
        onPress={() => {
          navigation.navigate("EmailSend");
        }}
      />
      <Button text={"비밀번호 찾기"} onPress={() => {}} />
    </Container>
  );
};

export default EmailLoginScreen;
