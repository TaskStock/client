import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { fcmService } from "./push.fcm";
import { localNotificationService } from "./push.noti";
import { client } from "../../services/api";
import { useAppSelect } from "../../store/configureStore.hooks";

export default function usePushNotification() {
  const { accessToken } = useAppSelect((state) => state.auth);

  const [fcmToken, setFcmToken] = useState("");
  const [isPushOn, setIsPushOn] = useState(false);

  const sendTokenToServer = async (fcmToken, isPushOn) => {
    if (accessToken === "") return;
    try {
      await client.post(
        "notice/fcm/token",
        {
          isPushOn: isPushOn,
          FCMToken: fcmToken,
        },
        { accessToken }
      );
      console.log("푸시알림 토큰 서버 전송 성공");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (fcmToken) {
      // TODO 푸시알림 토큰을 서버로 보내서 저장
      sendTokenToServer(fcmToken, isPushOn);
    }
  }, [fcmToken, isPushOn, accessToken]);

  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(
      onRegister,
      onNotification,
      onOpenNotification,
      setIsPushOn
    );
    localNotificationService.configure(onOpenNotification);
  }, []);

  const onRegister = (tk) => {
    console.log("[App] onRegister : fcmToken :", tk);
    if (tk) setFcmToken(tk);
  };

  const onNotification = (notify) => {
    console.log("[App] onNotification : notify :", notify);
    const options = {
      soundName: "default",
      playSound: true,
    };

    localNotificationService.showNotification(
      0,
      notify.title,
      notify.body,
      notify,
      options
    );
  };

  const onOpenNotification = (notify) => {
    console.log("[App] onOpenNotification : notify :", notify);
    Alert.alert("Open Notification : notify.body :" + notify.body);
  };

  return fcmToken;
}
