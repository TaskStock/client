import { configureStore } from "@reduxjs/toolkit";
import graphReducer, { graphApi } from "./modules/graph";
import { themeReducer } from "./modules/theme";
import calendarReducer from "./modules/calendar";
import todoReducer from "./modules/todo";
import { authReducer } from "./modules/auth";

const store = configureStore({
  reducer: {
    [graphApi.reducerPath]: graphApi.reducer,
    auth: authReducer,
    graph: graphReducer,
    theme: themeReducer,
    calendar: calendarReducer,
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(graphApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
