import { createSlice } from "@reduxjs/toolkit";
import { chartApi } from "./chart";
import { checkIsWithInCurrentCalcDay } from "../../utils/checkIsSameLocalDay";
import { Value } from "../../@types/chart";
import { DateString } from "../../@types/calendar";

//drawer 혹은 tab을 통해 화면을 전환할 때 사용하는 state

export interface savedValueUpdate {
  dstart: number;
  dend: number;
  dlow: number;
  dhigh: number;
}

export interface HomeState {
  tabIndex: number;
  isDrawerOpen: boolean;
  savedValueUpdate: savedValueUpdate;
}

const initialState: HomeState = {
  tabIndex: 0,
  isDrawerOpen: false,
  savedValueUpdate: {
    dstart: 0,
    dend: 0,
    dlow: 0,
    dhigh: 0,
  },
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setTabIndex: (state, action) => {
      state.tabIndex = action.payload;
    },
    setIsDrawerOpen: (
      state,
      action: {
        payload: {
          toState: boolean;
        };
      }
    ) => {
      console.log("setIsDrawerOpen", action.payload);

      const { toState } = action.payload;

      state.isDrawerOpen = toState;
    },
    saveValueUpdate: (
      state,
      action: {
        payload: {
          key: keyof savedValueUpdate;
          value: number;
        }[];
      }
    ) => {
      for (const { key, value } of action.payload) {
        if (key === "dstart") {
          state.savedValueUpdate.dstart += value;
        }
        if (key === "dend") {
          state.savedValueUpdate.dend += value;
        }
        if (key === "dlow") {
          state.savedValueUpdate.dlow += value;
        }
        if (key === "dhigh") {
          state.savedValueUpdate.dhigh += value;
        }
      }

      console.log("saveValueUpdate", state.savedValueUpdate);
    },
    resetSaveValueUpdate: (state) => {
      state.savedValueUpdate = {
        dstart: 0,
        dend: 0,
        dlow: 0,
        dhigh: 0,
      };
    },
  },
});

export default homeSlice.reducer;
export const {
  setTabIndex,
  setIsDrawerOpen,
  saveValueUpdate,
  resetSaveValueUpdate,
} = homeSlice.actions;
