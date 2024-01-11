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
  // oneMonthBeforeQueryString: DateString;
  // todayQueryString: DateString;
  currentDateString: IsoString;
  currentDateYYYYMMDD: DateString;
}

console.log(dayjs().local().toISOString());

const initialState: initialState = {
  itemHeight: 0,
  // 얘는 로컬로 보여주도록 수정해야한다.
  weeksOfMonth: calculateWeeksOfMonth(dayjs().toISOString()),
  // 얘는 로컬로 보여주도록 수정해야한다.
  datesOfMonth: calculateDatesOfMonth(dayjs().toISOString()),
  // 얘는 로컬로 보내주기로 되어있었음.
  // oneMonthBeforeQueryString: dayjs()
  //   .local()
  //   .subtract(29, "day")
  //   .format("YYYY-MM-DD") as DateString,
  // // 얘는 로컬로 보내주기로 되어있었음.
  // todayQueryString: dayjs()
  //   .local()
  //   .add(1, "day")
  //   .format("YYYY-MM-DD") as DateString,
  // 얘는 받아온 todoList와 value date의 기준이 되는 친구. 무조건 UTC.
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
