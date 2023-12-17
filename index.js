import { registerRootComponent } from "expo";
import { RecoilRoot, useRecoilState } from "recoil";
import App from "./App";

function Start() {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
}

registerRootComponent(Start);
