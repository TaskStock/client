import messaging from "@react-native-firebase/messaging";

// 푸시알림 토큰 권한 설정 및 토큰 서버로 전송
export const requestPushNotificationPermission = async () => {
    // 푸시알림 권한 확인
    const enabled = await messaging().hasPermission();
    if (!enabled) {
        // 푸시알림 권한 요청
        try {
            const authorizationStatus = await messaging().requestPermission();
            if (authorizationStatus) { // 권한 허용 시
                const fcmToken = await messaging().getToken();
                if (fcmToken) {
                    console.log("FCM Token: ", fcmToken);
                    // TODO 푸시알림 토큰을 서버로 보내서 저장
                    
                }
            } else { // 권한 거부 시
                console.log("FCM 푸시알림 권한이 거부되었습니다.");
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    }
}

// 푸시알림 수신 설정
// ? message 타입 어떻게 하지
export const handleNotification = async (message) => { // 백그라운드 알림 때문에 async로 변경(promise타입 반환)
    console.log("===== handleNotification =====");
    console.log("message: ", message);
    // TODO 푸시알림 수신 시 처리
    
}

// 포어그라운드 상태에서 알림 수신
messaging().onMessage(handleNotification);

// 백그라운드 상태에서 알림 수신
messaging().setBackgroundMessageHandler(handleNotification);