import React from "react";
import styled from "styled-components/native";
import Text from "../../../components/atoms/Text";
import { spacing } from "../../../constants/spacing";
import { useAppDispatch } from "../../../store/configureStore.hooks";
import { logout } from "../../../store/modules/auth";
import { resetNavigation } from "../../../utils/resetNavigation";

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

  const handleLogout = () => {
    dispatch(logout());
    resetNavigation(navigation);
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
      <Menu text="로그아웃" onPress={handleLogout} />
    </Container>
  );
};

export default SettingsHomeScreen;
