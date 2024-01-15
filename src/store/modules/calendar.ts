import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { calculateDatesOfMonth } from "../../utils/calculateDatesOfMonth";
import { calculateWeeksOfMonth } from "../../utils/calculateWeeksOfMonth";
import { CalendarItem, DateString, IsoString } from "../../@types/calendar";
import utc from "dayjs/plugin/utc";
import { initializeCalendarItems } from "../../utils/calendarUtils/initializeCalendarItems";
import { Todo } from "../../@types/todo";
import convertUTCToLocal from "../../utils/convertUTCtoLocal";

dayjs.extend(utc);

interface initialState {
  calendarItemHeight: number;
  calendarItemContainerHeight: number;
  weeksOfMonth: number;
  calendarItems: CalendarItem[];
  currentDateString: IsoString;
  currentDateYYYYMMDD: DateString;
}

const initialState: initialState = {
  calendarItemHeight: 0,
  calendarItemContainerHeight: 0,
  weeksOfMonth: calculateWeeksOfMonth(dayjs().toISOString()),
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
    setItemContainerHeight: (state, action) => {
      if (action.payload < 0) {
        return;
      }

      const containerHeight = action.payload;

      state.calendarItemContainerHeight = containerHeight;

      const weeksOfMonth = state.weeksOfMonth;

      const itemHeight =
        weeksOfMonth > 0 ? containerHeight / (weeksOfMonth + 1) : 0;

      state.calendarItemHeight = itemHeight;
    },
    setCurrentDateString: (
      state,
      action: {
        payload: IsoString;
      }
    ) => {
      // 근데, action.payload가 같은 달이라면? 렌더링을 하지 않아도 되는데?
      if (
        dayjs(action.payload).format("YYYY-MM") !==
        dayjs(state.currentDateString).format("YYYY-MM")
      ) {
        state.weeksOfMonth = calculateWeeksOfMonth(action.payload);
        state.calendarItemHeight =
          state.calendarItemContainerHeight / (state.weeksOfMonth + 1);
        state.calendarItems = initializeCalendarItems(
          calculateDatesOfMonth(action.payload),
          action.payload
        );
      }

      state.currentDateString = action.payload;

      state.calendarItems.forEach((item) => {
        const isSelected = item.date.isSame(action.payload, "date");
        const isToday = item.date.isSame(dayjs().toISOString(), "date");

        Object.assign(item, {
          isToday,
          isSelected,
        });
      });

      state.currentDateYYYYMMDD = dayjs(state.currentDateString).format(
        "YYYY-MM-DD"
      ) as DateString;
    },
    updateCalendarItemTodoCount: (
      state,
      action: {
        payload: {
          todos: Todo[];
        };
      }
    ) => {
      const { todos } = action.payload;

      state.calendarItems.forEach((item) => {
        const date = item.date.format("YYYY-MM-DD");

        const todoCount = todos.filter((todo) => {
          return dayjs(todo.date).format("YYYY-MM-DD") === date;
        }).length;

        Object.assign(item, {
          todoCount,
        });
      });
    },
    updateCalendarItemTodoCountValue: (
      state,
      action: {
        payload: {
          date: IsoString;
          value: number;
        };
      }
    ) => {
      const { date, value } = action.payload;

      const todoDate = dayjs(date).format("YYYY-MM-DD");

      state.calendarItems.forEach((item) => {
        const itemDate = item.date.format("YYYY-MM-DD");

        if (itemDate === todoDate) {
          item.todoCount += value;
        }
      });
    },
  },
});

export default calendarSlice.reducer;

export const {
  setItemContainerHeight,
  setCurrentDateString,
  updateCalendarItemTodoCount,
  updateCalendarItemTodoCountValue,
} = calendarSlice.actions;
