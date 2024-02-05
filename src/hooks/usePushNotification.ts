import { useEffect } from "react";
import { Alert } from "react-native";
import { client } from "../services/api";
import { useAppDispatch, useAppSelect } from "../store/configureStore.hooks";
import { setFcmToken } from "../store/modules/pushNoti";
import { fcmService } from "../utils/PushNotification/push.fcm";
import { localNotificationService } from "../utils/PushNotification/push.noti";

export default function usePushNotification() {
  const { accessToken } = useAppSelect((state) => state.auth);
  const { isPushOn, fcmToken } = useAppSelect((state) => state.pushNoti);

  const dispatch = useAppDispatch();

  const sendTokenToServer = async (fcmToken, isPushOn) => {
    if (accessToken === "") return;
    try {
      const res = await client.post(
        "notice/fcm/token",
        {
          isPushOn: isPushOn,
          FCMToken: fcmToken,
        },
        { accessToken }
      );
      console.log("푸시알림 토큰 서버 전송 성공");
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(
      onRegister,
      onNotification,
      onOpenNotification,
      dispatch
    );
    localNotificationService.configure(onOpenNotification);
  }, []);

  useEffect(() => {
    if (fcmToken) {
      // TODO 푸시알림 토큰을 서버로 보내서 저장
      sendTokenToServer(fcmToken, isPushOn);
    }
  }, [fcmToken]);

  const onRegister = (tk) => {
    console.log("[App] onRegister : fcmToken :", tk);
    if (tk) dispatch(setFcmToken(tk));
  };

  // 포그라운드
  const onNotification = (notify) => {
    if (notify) {
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
    }
  };

  // TODO: 백그라운드에서 푸시알림 클릭시 이벤트
  const onOpenNotification = (notify) => {
    if (notify) {
      console.log("[App] onOpenNotification : notify :", notify);
      const targetId = notify.data.target_id;
      const body = notify.notification.body;
      const title = notify.notification.title;

      console.log(targetId, title, body);

      // UI 그리기
      // 클릭하면 targetId 디테일페이지로 이동
    }
  };
}
