import React, { useState } from "react";
import { View } from "react-native";
import PageHeader from "../../components/molecules/PageHeader";
import styled from "styled-components/native";
import Menu from "../../components/molecules/Settings/Menu";
import { spacing } from "../../constants/spacing";
import { useAppDispatch, useAppSelect } from "../../store/configureStore.hooks";
import { setPrivateThunk } from "../../utils/UserUtils/setPrivate";
import { palette } from "../../constants/colors";

const Container = styled.View`
  padding: ${spacing.offset}px;
`;

const AccountScreen = ({ navigation }) => {
  const { private: isPrivate } = useAppSelect((state) => state.user.user);
  const dispatch = useAppDispatch();
  const [isEnabled, setIsEnabled] = useState<boolean>(isPrivate);
  const { strategy } = useAppSelect((state) => state.auth);
  console.log(strategy);

  const toggleSwitch = () => {
    dispatch(setPrivateThunk(!isEnabled));
  };
  return (
    <View>
      <PageHeader title="계정 설정" />
      <Container>
        <Menu
          text="비공개 계정"
          icon={{ type: "ionicons", name: "lock-closed-outline" }}
          toggle={{ isEnabled, setIsEnabled, toggleSwitch }}
        />
        {strategy === "local" && (
          <Menu
            text="비밀번호 재설정"
            icon={{ type: "ionicons", name: "shield-checkmark-outline" }}
            onPress={() => {
              navigation.navigate("ChangePwCheckPw");
            }}
          />
        )}

        <Menu text="회원 탈퇴" onPress={() => {}} textColor={palette.red} />
      </Container>
    </View>
  );
};

export default AccountScreen;
