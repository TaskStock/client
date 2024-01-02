import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { calculateDatesOfMonth } from "../../utils/calculateDatesOfMonth";
import { calculateWeeksOfMonth } from "../../utils/calculateWeeksOfMonth";

const initialState = {
  itemHeight: 0,
  weeksOfMonth: 0,
  datesOfMonth: calculateDatesOfMonth(dayjs().toISOString()),
  currentDateString: dayjs().toISOString(),
};

const calendarSlice = createSlice({
  name: "value",
  initialState,
  reducers: {
    setItemHeight: (state, action) => {
      if (action.payload < 0) {
        return;
      }

      state.itemHeight = action.payload;

      // if (state.weeksOfMonth === 0) {
      //   return;
      // }

      // state.itemHeight = action.payload / state.weeksOfMonth;
    },
    setCurrentDateString: (state, action) => {
      state.currentDateString = action.payload;
      state.weeksOfMonth = calculateWeeksOfMonth(state.currentDateString);
      state.datesOfMonth = calculateDatesOfMonth(state.currentDateString);
    },
  },
});

export default calendarSlice.reducer;

export const { setItemHeight, setCurrentDateString } = calendarSlice.actions;
