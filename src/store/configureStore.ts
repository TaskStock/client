import { configureStore } from "@reduxjs/toolkit";
import chartReducer, { chartApi } from "./modules/chart";
import { themeReducer } from "./modules/theme";
import calendarReducer from "./modules/calendar";
import todoReducer, { todoApi } from "./modules/todo/todo";
import { authReducer } from "./modules/auth";
import projectReducer from "./modules/project";

const store = configureStore({
  reducer: {
    [chartApi.reducerPath]: chartApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
    auth: authReducer,
    chart: chartReducer,
    theme: themeReducer,
    calendar: calendarReducer,
    todo: todoReducer,
    project: projectReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(chartApi.middleware)
      .concat(todoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
