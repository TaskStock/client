import React, { useEffect, useState } from "react";
import { BlackBtn } from "../../components/atoms/Buttons";
import TextInput from "../../components/atoms/TextInput";
import LoginContainer from "../../components/molecules/Login/LoginContainer";
import { spacing } from "../../constants/spacing";
import { useAppDispatch } from "../../store/configureStore.hooks";
import { registerUser } from "../../store/modules/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IUser {
  email: string;
  userName: string;
  password: string;
  isAgree: number;
  theme: string;
  language: string;
}

const EmailRegisterScreen = ({ route, navigation }) => {
  const email = route.params.email;
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState<IUser>({
    email: "",
    userName: "",
    password: "",
    isAgree: 1,
    theme: "gray",
    language: "korean",
  });

  useEffect(() => {
    setUser((prevUser) => ({
      ...prevUser,
      email: email,
    }));
  }, [email]);

  const dispatch = useAppDispatch();

  const handleChange = (name: string, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSignUp = () => {
    if (user.password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // 회원가입 성공
    dispatch(registerUser(user));
    navigation.navigate("MainTab", { screen: "Home" });
  };

  return (
    <LoginContainer>
      <TextInput
        subText={"사용자 이름"}
        placeholder="사용자 이름을 입력해주세요"
        value={user.userName}
        onChangeText={(text) => handleChange("userName", text)}
      />
      <TextInput
        subText={"비밀번호"}
        placeholder="비밀번호를 입력해주세요"
        value={user.password}
        onChangeText={(text) => handleChange("password", text)}
        secureTextEntry
        alertText={
          "해당 비밀번호를 사용할 수 없습니다. (영어 대소문자, 숫자, 특수문자 포함 8자 이상)"
        }
      />
      <TextInput
        subText={"비밀번호 확인"}
        placeholder="비밀번호를 다시 입력해주세요"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        alertText={
          "비밀번호가 일치하지 않습니다. (영어 대소문자, 숫자, 특수문자 포함 8자 이상)"
        }
      />
      <BlackBtn
        text={"확인"}
        onPress={handleSignUp}
        style={{ marginTop: spacing.padding }}
        // loading={loading}
      />
    </LoginContainer>
  );
};

export default EmailRegisterScreen;
