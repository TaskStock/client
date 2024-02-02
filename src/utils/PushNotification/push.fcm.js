import messaging from "@react-native-firebase/messaging";
import { Alert, Platform } from "react-native";
import { setPushOn } from "../../store/modules/pushNoti";

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
          dispatch(setPushOn(true));
        } else {
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
    messaging().onNotificationOpenedApp((remoteMessage) => {
      if (remoteMessage) {
        const notification = remoteMessage.notification;
        onOpenNotification(notification);
      }

      Alert.alert(remoteMessage.body);
    });

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

    this.messageListener = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage) {
        let notification = null;
        if (Platform.OS === "ios") {
          notification = remoteMessage.data.notification;
        } else {
          notification = remoteMessage.notification;
        }
        onNotification(notification);
      }
    });

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
      dispatch(setPushOn(true));
    } else {
      // 푸시 알림 off
      dispatch(setPushOn(false));
    }
  };
}

export const fcmService = new FCMService();
