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
          console.log(Platform.OS, ">>>>>[FCMService] enabled 들어옴");
          // dispatch(toggleStateThunk(true));
        } else {
          console.log(Platform.OS, "disabled 들어옴");
          this.requestPermission(onRegister);
          dispatch(toggleStateThunk(false));
        }
      })
      .catch((error) => {
        console.log(
          Platform.OS,
          ">>>>>[FCMService] Permission rejected ",
          error
        );
      });
  };

  getToken = (onRegister) => {
    messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
          console.log(
            Platform.OS,
            ">>>>>[FCMService] User does not have a device token"
          );
        }
      })
      .catch((error) => {
        console.log(Platform.OS, ">>>>>[FCMService] getToken rejected", error);
      });
  };

  requestPermission = (onRegister) => {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch((error) => {
        console.log(
          Platform.OS,
          ">>>>>[FCMService] Request Permission rejected",
          error
        );
      });
  };

  deleteToken = () => {
    messaging()
      .deleteToken()
      .catch((error) => {
        console.log(Platform.OS, ">>>>>[FCMService] Delete token error", error);
      });
  };

  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification
  ) => {
    // 실행중이지만 현재화면은 다른 앱이 실행중이거나 아무것도 실행하지않을때
    messaging().onNotificationOpenedApp((remoteMessage) => {
      if (remoteMessage) {
        console.log(
          Platform.OS,
          ">>>>>[FCMService] 백그라운드에서 알람 클릭 data: ",
          remoteMessage
        );
        // console.log(remoteMessage.data.target_id);

        onOpenNotification(remoteMessage);
      }
    });

    //앱이 실행중이 아닐때
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          const notification = remoteMessage.notification;
          onOpenNotification(notification);
        }
      })
      .catch((error) => {
        console.log(
          Platform.OS,
          ">>>>>[FCMService] quit state notification error : ",
          error
        );
      });

    // 포그라운드 상태 : 실행중이고 현재 화면일때
    this.messageListener = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage) {
        if (Platform.OS === "ios") {
          const notification =
            remoteMessage.notification || remoteMessage.data.notification;

          // 포그라운드 상태에서 메시지가 도착했을 때의 처리 로직
          if (notification) {
            console.log(
              Platform.OS,
              ">>>>>[FCMService] 포그라운드 알람:",
              notification
            );
            onNotification(notification);
          }
        } else {
          // Android
          console.log(
            Platform.OS,
            ">>>>>[FCMService] 포그라운드 알람:",
            notification
          );
          if (remoteMessage.notification) {
            onNotification(remoteMessage.notification);
          }
        }
      }
    });

    // 토큰 갱신
    messaging().onTokenRefresh((fcmToken) => {
      console.log(
        Platform.OS,
        ">>>>>[FCMService] New fcm token refresh: ",
        fcmToken
      );
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
