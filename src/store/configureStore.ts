import { configureStore } from "@reduxjs/toolkit";
import valueReducer from "./modules/value";
import { themeReducer } from "./modules/theme";

const store = configureStore({
  reducer: {
    value: valueReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
