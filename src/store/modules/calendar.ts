import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { calculateDatesOfMonth } from "../../utils/calculateDatesOfMonth";
import { calculateWeeksOfMonth } from "../../utils/calculateWeeksOfMonth";

const initialState = {
  itemHeight: 0,
  weeksOfMonth: calculateWeeksOfMonth(dayjs().toISOString()),
  datesOfMonth: calculateDatesOfMonth(dayjs().toISOString()),
  oneMonthBeforeQueryString: dayjs().subtract(1, "month").format("YYYY-MM-DD"),
  todayQueryString: dayjs().add(1, "month").format("YYYY-MM-DD"),
  currentDateString: dayjs().toISOString(),
  currentDateYYYYMMDD: dayjs().format("YYYY-MM-DD"),
};

const calendarSlice = createSlice({
  name: "value",
  initialState,
  reducers: {
    setItemHeight: (state, action) => {
      if (action.payload < 0) {
        return;
      }

      const height = action.payload;

      const weeksOfMonth = state.weeksOfMonth;
      const itemHeight = weeksOfMonth > 0 ? height / (weeksOfMonth + 1) : 0;

      state.itemHeight = itemHeight;
    },
    setCurrentDateString: (state, action) => {
      state.currentDateString = action.payload;
      state.weeksOfMonth = calculateWeeksOfMonth(state.currentDateString);
      state.datesOfMonth = calculateDatesOfMonth(state.currentDateString);
      state.currentDateYYYYMMDD = dayjs(state.currentDateString).format(
        "YYYY-MM-DD"
      );
    },
  },
});

export default calendarSlice.reducer;

export const { setItemHeight, setCurrentDateString } = calendarSlice.actions;
