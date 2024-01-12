import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "styled-components/native";
import { BlackBtn } from "../../components/atoms/Buttons";
import FlexBox from "../../components/atoms/FlexBox";
import Text from "../../components/atoms/Text";
import TextInput from "../../components/atoms/TextInput";
import LoginContainer from "../../components/molecules/Login/LoginContainer";
import { spacing } from "../../constants/spacing";
import { useAppDispatch, useAppSelect } from "../../store/configureStore.hooks";
import { loginWithEmail } from "../../utils/authUtils/signInUtils";

const EmailLoginScreen = ({ navigation }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const isLoggedIn = useAppSelect((state) => state.auth.isLoggedIn);

  const handleLogin = async () => {
    await dispatch(
      loginWithEmail({ email: user.email, password: user.password })
    );
  };
  useEffect(() => {
    if (isLoggedIn === true) {
      navigation.navigate("MainTab", {
        screen: "HomeStack",
        params: {
          screen: "HomeScreen",
        },
      });
    }
  }, [isLoggedIn]);

  const handleChange = (name: string, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const SubBtn = ({ text, onPress }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          paddingHorizontal: 10,
        }}
      >
        <Text size="sm" color={theme.textDim}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <LoginContainer>
      <TextInput
        subText={"이메일"}
        placeholder="이메일을 입력해주세요"
        value={user.email}
        onChangeText={(text) => handleChange("email", text)}
      />
      <TextInput
        subText={"비밀번호"}
        placeholder="비밀번호를 입력해주세요"
        value={user.password}
        onChangeText={(text) => handleChange("password", text)}
        alert={!!alert}
        alertText={alert}
        secureTextEntry
      />
      <BlackBtn
        text={"로그인"}
        onPress={handleLogin}
        style={{ marginTop: spacing.padding }}
        loading={loading}
      />
      <FlexBox justifyContent="center" styles={{ marginTop: spacing.gutter }}>
        <SubBtn
          text={"회원가입"}
          onPress={() => {
            navigation.navigate("EmailSend");
          }}
        />
        <View
          style={{
            backgroundColor: theme.textDim,
            width: 1,
            height: "100%",
          }}
        />
        <SubBtn
          text={"비밀번호 찾기"}
          onPress={() => {
            navigation.navigate("FindPwEmailSend");
          }}
        />
      </FlexBox>
    </LoginContainer>
  );
};

export default EmailLoginScreen;
