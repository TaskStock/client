import React, { useEffect } from "react";
import styled from "styled-components/native";
import Text from "../../components/atoms/Text";
import { spacing } from "../../constants/spacing";
import { useAppDispatch, useAppSelect } from "../../store/configureStore.hooks";
import { checkStorage } from "../../utils/asyncStorage";
import { logout } from "../../utils/authUtils/signInUtils";
import { resetNavigation } from "../../utils/resetNavigation";
import getDeviceId from "../../utils/getDeviceId";

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: ${spacing.padding}px;
`;

const MenuContainer = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  justify-content: center;
  padding-left: 20px;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.box};
`;

const Menu = ({ text, onPress }) => (
  <MenuContainer onPress={onPress}>
    <Text size="md">{text}</Text>
  </MenuContainer>
);
const SettingsHomeScreen = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelect((state) => state.auth.isLoggedIn);
  const handleLogout = async () => {
    await dispatch(logout());
  };
  useEffect(() => {
    if (isLoggedIn === false) {
      resetNavigation(navigation);
    }
  }, [isLoggedIn, navigation]);

  const redux_auth = useAppSelect((state) => state.auth);
  const redux_user = useAppSelect((state) => state.user);
  const checkRedux = () => {
    console.log("=====redux=====");
    console.log(redux_auth);
    console.log(redux_user);
  };

  return (
    <Container>
      <Menu text="계정 설정 =>" onPress={() => {}} />
      <Menu
        text="테마 변경 =>"
        onPress={() => {
          navigation.navigate("SettingsTheme");
        }}
      />
      <Menu text="asyncStorage check" onPress={checkStorage} />
      <Menu text="redux check" onPress={checkRedux} />
      <Menu text="device id" onPress={getDeviceId} />
      <Menu text="로그아웃" onPress={handleLogout} />
      <Menu text="회원 탈퇴" onPress={() => {}} />
      <Menu text="비밀번호 변경" onPress={() => {}} />
    </Container>
  );
};

export default SettingsHomeScreen;
