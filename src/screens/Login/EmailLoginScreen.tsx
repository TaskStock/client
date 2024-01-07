import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "styled-components/native";
import { BlackBtn } from "../../components/atoms/Buttons";
import FlexBox from "../../components/atoms/FlexBox";
import Text from "../../components/atoms/Text";
import TextInput from "../../components/atoms/TextInput";
import LoginContainer from "../../components/molecules/Login/LoginContainer";
import { spacing } from "../../constants/spacing";
import { client } from "../../services/api";
import { useAppDispatch } from "../../store/configureStore.hooks";
import { loginSuccess } from "../../store/modules/auth";

const EmailLoginScreen = ({ navigation }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [emailAlert, setEmailAlert] = useState(false);
  const [pwAlert, setPwAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const responseData = await client.post("account/login/email", {
        email: user.email,
        password: user.password,
      });
      if (responseData.result === "success") {
        dispatch(loginSuccess(responseData));

        navigation.navigate("MainTab", {
          screen: "HomeStack",
          params: {
            screen: "HomeScreen",
          },
        });
      } else if (responseData.result === "fail") {
        // TODO: 비밀번호 틀려서 로그인 실패했을 때 error로 인식함
        setPwAlert(true);
      }
      // else if (){
      //   // TODO: 이메일 존재하지 않는 경우

      // }
      else {
        alert("로그인에 실패했습니다.");
      }
      // console.log(responseData);
    } catch (error) {
      console.error("[client] 로그인 오류 발생:", error);
    }
    setLoading(false);
  };

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
            navigation.navigate("FindPassword");
          }}
        />
      </FlexBox>
    </LoginContainer>
  );
};

export default EmailLoginScreen;
