import { registerRootComponent } from "expo";
import { Provider } from "react-redux";
import App from "./App";
import store from "./src/store/configureStore";

function Start() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

registerRootComponent(Start);
