import { createSlice } from "@reduxjs/toolkit";
import { getData, storeData } from "../../utils/asyncStorage";

interface TutorialState {
  showTutorial: boolean;
  step1: boolean;
  step2: boolean;
  step3: boolean;
  step4: boolean;
  step5: boolean;
  // project tutorial
  showProjectTutorial: boolean;
  step6: boolean;
  step7: boolean;
  // market tutorial
  showMarketTutorial: boolean;
  step8: boolean;
  step9: boolean;
  step10: boolean;
  step11: boolean;
}
const initialState: TutorialState = {
  showTutorial: false,
  step1: false, // 모달 open
  step2: false, // todo 등록 모달
  step3: false, // todo 체크
  step4: false, // 그래프 dotted border
  step5: false, // tutorial 종료 팝업
  // project tutorial
  showProjectTutorial: false,
  step6: false, // project tutorial 1
  step7: false, // project tutorial 2
  // market tutorial
  showMarketTutorial: false,
  step8: false, // market tutorial 1
  step9: false, // market tutorial 2
  step10: false, // market tutorial 3
  step11: false, // market tutorial 4
};
export const checkFirstTime = async () => {
  // asyncStorage에 firstTime이라는 키가 있는지 확인
  // 없으면 처음 온 것이므로, asyncStorage에 이제 처음이 아니라는 뜻으로 firstTime: false를 저장하고,
  const firstTime = await getData("firstTime");
  // console.log("redux firstTime >>>> ", firstTime);
  // firstTime이 없으면 처음 가입했단 뜻
  if (!firstTime) {
    await storeData("firstTime", "false");
    return true;
  }
  return false;
};

export const checkProjectFirstTime = async () => {
  const firstTime = await getData("projectFirstTime");

  if (!firstTime) {
    await storeData("projectFirstTime", "false");
    return true;
  }
  return false;
};
export const checkMarketFirstTime = async () => {
  const firstTime = await getData("marketFirstTime");

  if (!firstTime) {
    await storeData("marketFirstTime", "false");
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
    // project tutorial
    setProjectTutorial: (state, action) => {
      state.showProjectTutorial = action.payload;
      if (action.payload === true) {
        state.step6 = true;
      }
    },
    setStep6: (state, action) => {
      state.step6 = action.payload;
      if (action.payload === false) state.step7 = true;
    },
    // market tutorial
    setMarketTutorial: (state, action) => {
      state.showMarketTutorial = action.payload;
      console.log(state.showMarketTutorial);
      if (action.payload === true) {
        state.step8 = true;
      }
    },
    setStep8: (state, action) => {
      state.step8 = action.payload;
      if (action.payload === false) state.step9 = true;
    },
    setStep9: (state, action) => {
      state.step9 = action.payload;
      if (action.payload === false) state.step10 = true;
    },
    setStep10: (state, action) => {
      state.step10 = action.payload;
      if (action.payload === false) state.step11 = true;
    },
  },
});

export const {
  setTutorial,
  setStep1,
  setStep2,
  setStep3,
  setStep4,
  setProjectTutorial,
  setStep6,
  setMarketTutorial,
  setStep8,
  setStep9,
  setStep10,
} = tutorialSlice.actions;
export const tutorialReducer = tutorialSlice.reducer;
