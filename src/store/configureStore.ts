import { configureStore } from "@reduxjs/toolkit";
import valueReducer, { valueApi } from "./modules/value";
import { themeReducer } from "./modules/theme";
import calendarReducer from "./modules/calendar";
import todoReducer from "./modules/todo";
import { authReducer } from "./modules/auth";

const store = configureStore({
  reducer: {
    [valueApi.reducerPath]: valueApi.reducer,
    auth: authReducer,
    value: valueReducer,
    theme: themeReducer,
    calendar: calendarReducer,
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(valueApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
