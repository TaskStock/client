import { registerRootComponent } from "expo";
import { Provider } from "react-redux";
import { RecoilRoot } from "recoil";
import App from "./App";
import store from "./src/store/configureStore";

function Start() {
  return (
    <RecoilRoot>
      <Provider store={store}>
        <App />
      </Provider>
    </RecoilRoot>
  );
}

registerRootComponent(Start);
