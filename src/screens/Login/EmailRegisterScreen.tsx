import React, { useEffect, useState } from "react";
import { BlackBtn } from "../../components/atoms/Buttons";
import TextInput from "../../components/atoms/TextInput";
import LoginContainer from "../../components/molecules/Login/LoginContainer";
import { spacing } from "../../constants/spacing";
import { useAppDispatch, useAppSelect } from "../../store/configureStore.hooks";
import { registerWithEmail } from "../../utils/authUtils/signInUtils";

// 인증번호가 일치하면 이 화면으로 오는데, 다시 인증코드페이지로 돌아간 후 다시 코드를 입력하면 서버 오류가 뜨므로 뒤로가기 버튼 없앰

export interface IRegisterUser {
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
  const [user, setUser] = useState<IRegisterUser>({
    email: "",
    userName: "",
    password: "",
    isAgree: 1,
    theme: "gray",
    language: "korean",
  });
  const isLoggedIn = useAppSelect((state) => state.auth.isLoggedIn);

  // 테마 설정
  const appTheme = useAppSelect((state) => state.theme.value);
  useEffect(() => {
    setUser((prevUser) => ({
      ...prevUser,
      theme: appTheme,
    }));
  }, [appTheme]);

  useEffect(() => {
    setUser((prevUser) => ({
      ...prevUser,
      email: email,
    }));
  }, [email]);

  const dispatch = useAppDispatch();
  // const { modalVisible, setModalVisible } = HandleModalVisible();

  const handleChange = (name: string, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      navigation.navigate("MainTab", {
        screen: "Home",
      });
    }
  }, [isLoggedIn]);

  const handleSignUp = async () => {
    if (user.password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    await dispatch(registerWithEmail(user));
  };

  return (
    <LoginContainer>
      {/* <PopupModal text={"회원가입이 완료되었습니다."} onPress={() => {}} /> */}
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
