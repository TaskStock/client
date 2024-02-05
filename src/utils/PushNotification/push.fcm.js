import messaging from "@react-native-firebase/messaging";
import { Alert, Platform } from "react-native";
import { toggleStateThunk } from "./pushNotiThunk";

class FCMService {
  register = (onRegister, onNotification, onOpenNotification, dispatch) => {
    this.checkPermission(onRegister, dispatch);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification
    );
  };

  registerAppWithFCM = async () => {
    if (Platform.OS === "ios") {
      await messaging().setAutoInitEnabled(true);
    }
  };

  checkPermission = (onRegister, dispatch) => {
    messaging()
      .hasPermission()
      .then((enabled) => {
        this.getToken(onRegister);
        if (enabled) {
          console.log("enabled 들어옴");
          dispatch(toggleStateThunk(true));
        } else {
          console.log("disabled 들어옴");
          this.requestPermission(onRegister);
        }
      })
      .catch((error) => {
        console.log("[FCMService] Permission rejected ", error);
      });
  };

  getToken = (onRegister) => {
    messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
          console.log("[FCMService] User does not have a device token");
        }
      })
      .catch((error) => {
        console.log("[FCMService] getToken rejected", error);
      });
  };

  requestPermission = (onRegister) => {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch((error) => {
        console.log("[FCMService] Request Permission rejected", error);
      });
  };

  deleteToken = () => {
    messaging()
      .deleteToken()
      .catch((error) => {
        console.log("[FCMService] Delete token error", error);
      });
  };

  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification
  ) => {
    // 백그라운드에서 알림을 클릭했을 때의 처리 로직
    messaging().onNotificationOpenedApp((remoteMessage) => {
      if (remoteMessage) {
        console.log(remoteMessage.data.target_id);

        onOpenNotification(remoteMessage);
      }
    });

    // 앱이 종료된 상태에서 사용자가 알림을 클릭하여 앱이 시작될 때
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          const notification = remoteMessage.notification;
          onOpenNotification(notification);
        }
      })
      .catch((error) => {
        console.log("quit state notification error : ", error);
      });

    // 포그라운드 상태
    this.messageListener = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage) {
        if (Platform.OS === "ios") {
          const notification =
            remoteMessage.notification || remoteMessage.data.notification;

          // 포그라운드 상태에서 메시지가 도착했을 때의 처리 로직
          if (notification) {
            console.log(
              "Notification while app is in foreground:",
              notification
            );
            onNotification(notification);
          }
        } else {
          // Android
          if (remoteMessage.notification) {
            onNotification(remoteMessage.notification);
          }
        }
      }
    });

    // 토큰 갱신
    messaging().onTokenRefresh((fcmToken) => {
      console.log("New fcm token refresh: ", fcmToken);
      onRegister(fcmToken);
    });
  };

  unRegister = () => {
    this.messageListener();
  };

  // 푸시 알림 토글
  togglePushNotifications = (isPushOn, onRegister, dispatch) => {
    if (isPushOn) {
      // 푸시 알림 on
      this.checkPermission(onRegister, dispatch);
      dispatch(toggleStateThunk(true));
    } else {
      // 푸시 알림 off
      dispatch(toggleStateThunk(false));
    }
  };
}

export const fcmService = new FCMService();
