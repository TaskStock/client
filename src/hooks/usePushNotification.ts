import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { useEffect } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import PushNotification from "react-native-push-notification";
import { useAppDispatch, useAppSelect } from "../store/configureStore.hooks";
import { setFcmToken } from "../store/modules/pushNoti";
import { fcmService } from "../utils/PushNotification/push.fcm";
import { localNotificationService } from "../utils/PushNotification/push.noti";
import { navigate } from "../utils/navigation";
import { useClient } from "./useClient";

export default function usePushNotification() {
  const { accessToken } = useAppSelect((state) => state.auth);
  const { isPushOn, fcmToken } = useAppSelect((state) => state.pushNoti);
  const { userInfoLoaded } = useAppSelect((state) => state.user);
  const dispatch = useAppDispatch();
  const client = useClient(dispatch);

  // AOS 권한 요청
  const requestNotificationPermission = async () => {
    if (Platform.OS === "android") {
      try {
        PermissionsAndroid.check("android.permission.POST_NOTIFICATIONS").then(
          (response) => {
            if (response) {
              // 키기
            }
            if (!response) {
              const granted = PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                {
                  title: "앱 알림 권한 요청",
                  message: "앱에서 푸시 알림을 받으려면 권한을 허용해주세요.",
                  buttonPositive: "확인",
                }
              );
              console.log("granted=====", granted);
            }
          }
        );
      } catch (err) {
        console.warn(err);
      }
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

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
      // console.log("푸시알림 토큰 서버 전송 성공");
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
    if (fcmToken && userInfoLoaded) {
      // TODO 푸시알림 토큰을 서버로 보내서 저장
      sendTokenToServer(fcmToken, isPushOn);
    }
  }, [fcmToken, userInfoLoaded]);

  const onRegister = (tk) => {
    // console.log(Platform.OS, ">>>>>[FCMService] onRegister, fcmToken :", tk);

    if (tk) dispatch(setFcmToken(tk));
  };

  // 포그라운드
  const onNotification = (notify) => {
    if (notify) {
      console.log(
        Platform.OS,
        ">>>>>[FCMService] onNotification, notify :",
        notify
      );

      const options = {
        soundName: "default",
        playSound: true,
        // Android-only options:
        channelId: "taskstock_push_notification", // 채널 ID 설정, Android O 이상 필요
      };

      if (Platform.OS === "android") {
        PushNotification.localNotification({
          message: notify.body,
          title: notify.title,
          // bigPictureUrl: remoteMessage.notification.android.imageUrl,
          // smallIcon: remoteMessage.notification.android.imageUrl,
        });
      } else {
        PushNotificationIOS.addNotificationRequest({
          id: "undefined",
          body: notify.body,
          title: notify.title,
          userInfo: undefined,
        });
      }
      // localNotificationService.showNotification(
      //   0,
      //   notify.title,
      //   notify.body,
      //   notify,
      //   options
      // );
      // 로컬 알림 표시
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

      // 클릭하면 targetId 디테일페이지로 이동
      if (targetId) {
        navigate("MainTab", {
          screen: "SnsStack",
          params: {
            screen: "UserDetail",
            params: { userId: targetId },
          },
        });
      }

      // Alert.alert("onOpenNotification:", targetId, title, body);
    }
  };
}
