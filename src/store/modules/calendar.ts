import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = {
  itemHeight: 0,
  weeksOfMonth: 0,
  datesOfMonth: [],
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

      state.itemHeight = action.payload / state.weeksOfMonth;
    },
    setCurrentDateString: (state, action) => {
      state.currentDateString = action.payload;
      const currentDate = dayjs(action.payload);

      const startOfMonth = currentDate.startOf("month");
      const startDay = startOfMonth.startOf("week");

      const endOfMonth = currentDate.endOf("month");
      const endDay = endOfMonth.endOf("week");

      const calendar = [];

      let day = startDay;
      while (day.isBefore(endDay)) {
        calendar.push(day);
        day = day.add(1, "day");
      }

      state.datesOfMonth = calendar;
    },
  },
});

export default calendarSlice.reducer;

export const { setItemHeight } = calendarSlice.actions;
