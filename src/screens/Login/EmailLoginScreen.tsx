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
import { setLoggedIn } from "../../store/modules/auth";
import { getAPIHost } from "../../utils/getAPIHost";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import getDeviceId from "../../utils/getDeviceId";
import Toast from "react-native-toast-message";

const EmailLoginScreen = ({ navigation }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState("");
  const { loading, isLoggedIn } = useAppSelect((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate("MainTab", {
        screen: "Home",
      });
    }
  }, [isLoggedIn]);
  const handleLogin = async () => {
    // server 응답 형식의 차이 때문에 utils와 분리
    const SERVER_URL = getAPIHost();
    const url = `${SERVER_URL}account/login/email`;
    const deviceId = await getDeviceId();

    if (!user.email || !user.password) {
      setAlert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
          device_id: deviceId,
        }),
      });

      const responseData = await response.json();
      console.log("이메일 응답", responseData);
      if (responseData.result === "success") {
        dispatch(setLoggedIn({ ...responseData, deviceId }));
      } else if (responseData.result === "fail") {
        setAlert(responseData.message);
      }
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "서버와의 연결이 원활하지 않습니다.",
        visibilityTime: 2000,
        keyboardOffset: 100,
      });
    }
  };

  const handleChange = (name: string, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    setAlert("");
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
        secureTextEntry
      />
      {alert && (
        <View
          style={{
            paddingVertical: useResponsiveFontSize(3),
            width: "100%",
          }}
        >
          <Text size="xs" color={theme.alert}>
            {alert}
          </Text>
        </View>
      )}
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
