import { configureStore } from "@reduxjs/toolkit";
import graphReducer, { graphApi } from "./modules/graph";
import { themeReducer } from "./modules/theme";
import calendarReducer from "./modules/calendar";
import todoReducer, { todoApi } from "./modules/todo";
import { authReducer } from "./modules/auth";
import projectReducer from "./modules/project";

const store = configureStore({
  reducer: {
    [graphApi.reducerPath]: graphApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
    auth: authReducer,
    graph: graphReducer,
    theme: themeReducer,
    calendar: calendarReducer,
    todo: todoReducer,
    project: projectReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(graphApi.middleware)
      .concat(todoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
