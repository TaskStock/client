import PushNotification, { Importance } from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { Platform } from "react-native";

class LocalNotificationService {
  configure = (onOpenNotification) => {
    // Android 8.0 이상에서 foreground 알림을 위해  채널 생성
    if (Platform.OS === "android") {
      PushNotification.createChannel(
        {
          channelId: "taskstock_push_notification", // (required)
          channelName: "TaskStock", // (required)
          channelDescription: "TaskStock에서 보내는 알림", // (optional) default: undefined.
          playSound: false, // (optional) default: true
          soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
          importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
          vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
      );
    }

    PushNotification.configure({
      onRegister: function (token) {
        console.log(
          "[LocalNotificationService] onRegister : localtoken",
          token
        );
      },
      onNotification: function (notification) {
        console.log("[LocalNotificationService] onNotification ", notification);
        if (!notification?.data) {
          return;
        }
        notification.userInteraction = true;
        onOpenNotification(
          Platform.OS === "ios" ? notification.data.item : notification.data
        );

        if (Platform.OS === "ios") {
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  };

  unRegister = () => {
    PushNotification.unregister();
  };

  showNotification = (id, title, message, data = {}, options = {}) => {
    PushNotification.localNotification({
      // Android only Properties
      ...this.buildAndroidNotification(id, title, message, data, options),
      // IOS and Android properties
      ...this.buildIOSNotification(id, title, message, data, options),
      // IOS and Android properties
      title: title || "",
      message: message || "",
      playSound: options.playSound || false,
      soundName: options.soundName || "default",
      userInteraction: false,
    });
  };

  buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
    return {
      id: id,
      authCancel: true,
      largeIcon: options.largeIcon || "ic_launcher",
      smallIcon: options.smallIcon || "ic_notification",
      bigText: message || "",
      subText: title || "",
      vibrate: options.vibrate || true,
      vibration: options.vibration || 300,
      priority: options.priority || "high",
      importance: options.importance || "high",
      data: data,
    };
  };

  buildIOSNotification = (id, title, message, data = {}, options = {}) => {
    return {
      alertAction: options.alertAction || "view",
      category: options.category || "",
      userInfo: {
        id: id,
        item: data,
      },
    };
  };

  cancelAllLocalNotifications = () => {
    if (Platform.OS === "ios") {
      PushNotificationIOS.removeAllDeliveredNotifications();
    } else {
      PushNotification.cancelAllLocalNotifications();
    }
  };

  removeDeliveredNotificationByID = (notification) => {
    console.log(
      "[LocalNotificationService] removeDeliveredNotificationByID:",
      notification
    );
    PushNotification.cancelLocalNotifications({ id: `${notificationId}` });
  };
}

export const localNotificationService = new LocalNotificationService();
