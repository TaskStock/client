import { registerRootComponent } from "expo";
import { Provider } from "react-redux";
import App from "./App";
import store from "./src/store/configureStore";

import messaging from "@react-native-firebase/messaging";

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Background remote message: ", remoteMessage);
});

function Start() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

registerRootComponent(Start);
