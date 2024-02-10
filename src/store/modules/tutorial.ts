import { createSlice } from "@reduxjs/toolkit";
import { getData, storeData } from "../../utils/asyncStorage";

interface TutorialState {
  showTutorial: boolean;
  step1: boolean;
  step2: boolean;
  step3: boolean;
  step4: boolean;
  step5: boolean;
}
const initialState: TutorialState = {
  showTutorial: false,
  step1: false, // 모달 open
  step2: false, // todo 등록 모달
  step3: false, // todo 체크
  step4: false, // 그래프 dotted border
  step5: false, // tutorial 종료 팝업
};
export const checkFirstTime = async () => {
  // asyncStorage에 firstTime이라는 키가 있는지 확인
  // 없으면 처음 온 것이므로, asyncStorage에 이제 처음이 아니라는 뜻으로 firstTime: false를 저장하고,
  const firstTime = await getData("firstTime");
  console.log("redux firstTime >>>> ", firstTime);
  // firstTime이 없으면 처음 가입했단 뜻
  if (!firstTime) {
    await storeData("firstTime", "false");
    return true;
  }
  return false;
};
export const tutorialSlice = createSlice({
  name: "tutorial",
  initialState,
  reducers: {
    setTutorial: (state, action) => {
      state.showTutorial = action.payload;
      if (action.payload === true) {
        state.step1 = true;
      }
    },
    setStep1: (state, action) => {
      state.step1 = action.payload;
      if (action.payload === false) state.step2 = true;
    },
    setStep2: (state, action) => {
      state.step2 = action.payload;
      if (action.payload === false) state.step3 = true;
    },
    setStep3: (state, action) => {
      state.step3 = action.payload;
      if (action.payload === false) state.step4 = true;
    },
    setStep4: (state, action) => {
      state.step4 = action.payload;
      if (action.payload === false) state.step5 = true;
    },
  },
});

export const { setTutorial, setStep1, setStep2, setStep3, setStep4 } =
  tutorialSlice.actions;
export const tutorialReducer = tutorialSlice.reducer;
