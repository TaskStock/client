import { configureStore } from "@reduxjs/toolkit";
import valueReducer from "./modules/value";

const store = configureStore({
  reducer: {
    value: valueReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
