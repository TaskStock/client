import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { calculateDatesOfMonth } from "../../utils/calculateDatesOfMonth";
import { calculateWeeksOfMonth } from "../../utils/calculateWeeksOfMonth";
import { CalendarItem, DateString, IsoString } from "../../@types/calendar";
import utc from "dayjs/plugin/utc";
import { initializeCalendarItems } from "../../utils/calendarUtils/initializeCalendarItems";

dayjs.extend(utc);

interface initialState {
  itemHeight: number;
  weeksOfMonth: number;
  datesOfMonth: dayjs.Dayjs[];
  calendarItems: CalendarItem[];
  currentDateString: IsoString;
  currentDateYYYYMMDD: DateString;
}

const initialState: initialState = {
  itemHeight: 0,
  weeksOfMonth: calculateWeeksOfMonth(dayjs().toISOString()),
  datesOfMonth: calculateDatesOfMonth(dayjs().toISOString()),
  calendarItems: initializeCalendarItems(
    calculateDatesOfMonth(dayjs().toISOString()),
    dayjs().toISOString()
  ),
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
      console.log("setCurrentDateString", action.payload);

      // 근데, action.payload가 같은 달이라면? 렌더링을 하지 않아도 되는데?
      if (
        dayjs(action.payload).format("YYYY-MM") !==
        dayjs(state.currentDateString).format("YYYY-MM")
      ) {
        state.weeksOfMonth = calculateWeeksOfMonth(action.payload);
        state.datesOfMonth = calculateDatesOfMonth(action.payload);

        state.calendarItems = initializeCalendarItems(
          state.datesOfMonth,
          action.payload
        );
      }

      state.currentDateString = action.payload;

      state.calendarItems.forEach((item) => {
        const isSelected = item.date.isSame(action.payload, "date");
        const isThisMonth = item.date.isSame(action.payload, "month");
        const isToday = item.date.isSame(dayjs().toISOString(), "date");

        Object.assign(item, {
          isToday,
          isThisMonth,
          isSelected,
        });
      });

      state.currentDateYYYYMMDD = dayjs(state.currentDateString).format(
        "YYYY-MM-DD"
      ) as DateString;
    },
  },
});

export default calendarSlice.reducer;

export const { setItemHeight, setCurrentDateString } = calendarSlice.actions;
