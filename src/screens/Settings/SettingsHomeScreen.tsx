import React, { useEffect } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import PageHeader from "../../components/molecules/PageHeader";
import Menu from "../../components/molecules/Settings/Menu";
import { palette } from "../../constants/colors";
import { spacing } from "../../constants/spacing";
import { useAppDispatch, useAppSelect } from "../../store/configureStore.hooks";
import { setFcmToken, setIsPushOn } from "../../store/modules/pushNoti";
import { fcmService } from "../../utils/PushNotification/push.fcm";
import { logout } from "../../utils/authUtils/signInUtils";
import { resetNavigation } from "../../utils/resetNavigation";

const Container = styled.View`
  flex: 1;
  padding: 0 ${spacing.offset}px;
`;

const SettingsHomeScreen = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { isLoggedIn, accessToken } = useAppSelect((state) => state.auth);

  // 로그아웃
  const askLogout = () => {
    Alert.alert(
      "로그아웃",
      "정말로 로그아웃 하시겠습니까?", // 메시지
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "확인",
          onPress: async () => {
            await dispatch(logout());
            // 로그아웃 처리 로직
          },
        },
      ],
      { cancelable: false }
    );
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

  // 푸시알림
  const { isPushOn } = useAppSelect((state) => state.pushNoti);

  const onRegister = (tk) => {
    if (tk) dispatch(setFcmToken(tk));
  };

  const toggleSwitch = () => {
    fcmService.togglePushNotifications(!isPushOn, onRegister, dispatch);
  };

  return (
    <>
      <PageHeader title="설정" />
      <Container>
        <Menu
          text="계정 설정"
          onPress={() => navigation.navigate("SettingsAccount")}
          icon={{ type: "materialIcons", name: "account-circle" }}
        />
        <Menu
          text="푸시알림 켜기"
          icon={{ type: "material", name: "bell" }}
          toggle={{
            isEnabled: isPushOn,
            setIsEnabled: () => dispatch(setIsPushOn(isPushOn)),
            toggleSwitch,
          }}
        />
        <Menu
          text="테마 변경"
          onPress={() => navigation.navigate("SettingsTheme")}
          icon={{ type: "ionicons", name: "color-palette" }}
        />
        <Menu
          text="고객센터"
          onPress={() => navigation.navigate("SettingsCustomerService")}
          icon={{ type: "material", name: "headset" }}
        />
        <Menu
          text="정보"
          onPress={() => navigation.navigate("SettingsInfo")}
          icon={{ type: "ionicons", name: "information-circle" }}
        />
        <Menu text="로그아웃" onPress={askLogout} textColor={palette.red} />
      </Container>
    </>
  );
};

export default SettingsHomeScreen;
