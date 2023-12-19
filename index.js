import { registerRootComponent } from "expo";
import { RecoilRoot, useRecoilState } from "recoil";
import App from "./App";
import { Provider } from "react-redux";
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