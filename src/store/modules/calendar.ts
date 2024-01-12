import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { calculateDatesOfMonth } from "../../utils/calculateDatesOfMonth";
import { calculateWeeksOfMonth } from "../../utils/calculateWeeksOfMonth";
import { DateString, IsoString } from "../../@types/calendar";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

interface initialState {
  itemHeight: number;
  weeksOfMonth: number;
  datesOfMonth: dayjs.Dayjs[];
  currentDateString: IsoString;
  currentDateYYYYMMDD: DateString;
}

const initialState: initialState = {
  itemHeight: 0,
  weeksOfMonth: calculateWeeksOfMonth(dayjs().toISOString()),
  datesOfMonth: calculateDatesOfMonth(dayjs().toISOString()),
  currentDateString: dayjs().toISOString() as IsoString,
  currentDateYYYYMMDD: dayjs().format("YYYY-MM-DD") as DateString,
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
    setCurrentDateString: (
      state,
      action: {
        payload: IsoString;
      }
    ) => {
      state.currentDateString = action.payload;
      state.weeksOfMonth = calculateWeeksOfMonth(state.currentDateString);
      state.datesOfMonth = calculateDatesOfMonth(state.currentDateString);
      state.currentDateYYYYMMDD = dayjs(state.currentDateString).format(
        "YYYY-MM-DD"
      ) as DateString;
    },
  },
});

export default calendarSlice.reducer;

export const { setItemHeight, setCurrentDateString } = calendarSlice.actions;
