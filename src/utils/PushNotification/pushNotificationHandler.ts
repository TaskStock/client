import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { fcmService } from "./push.fcm";
import { localNotificationService } from "./push.noti";

export default function usePushNotification() {
  const [fcmToken, setFcmToken] = useState("");

  useEffect(() => {
    console.log("fcmToken : ", fcmToken);
  }, [fcmToken]);

  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
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
