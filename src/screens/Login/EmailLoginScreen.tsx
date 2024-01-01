import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { BlackBtn } from "../../components/atoms/Buttons";
import FlexBox from "../../components/atoms/FlexBox";
import Text from "../../components/atoms/Text";
import TextInput from "../../components/atoms/TextInput";
import LoginContainer from "../../components/molecules/Login/LoginContainer";
import { darkTheme, grayTheme } from "../../constants/colors";
import { useAppSelect } from "../../store/configureStore.hooks";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import { spacing } from "../../constants/spacing";

const THEME_CONSTANTS = {
  dark: {
    subTextColor: darkTheme.textDim,
  },
  gray: {
    subTextColor: grayTheme.textDim,
  },
};

const EmailLoginScreen = ({ navigation }) => {
  const theme = useAppSelect((state) => state.theme.value);
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

  const SubBtn = ({ text, onPress }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          paddingHorizontal: 10,
        }}
      >
        <Text size="sm" color={THEME_CONSTANTS[theme].subTextColor}>
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
        onPress={() => {}}
        style={{ marginTop: spacing.padding }}
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
            backgroundColor: THEME_CONSTANTS[theme].subTextColor,
            width: 1,
            height: "100%",
          }}
        />
        <SubBtn text={"비밀번호 찾기"} onPress={() => {}} />
      </FlexBox>
    </LoginContainer>
  );
};

export default EmailLoginScreen;
