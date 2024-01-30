import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store/configureStore";
import { client } from "../../services/api";

export const getUserInfoThunk = createAsyncThunk(
  "user/getUserInfo",
  async (_, { rejectWithValue, getState }) => {
    const rootState = getState() as RootState;

    const accessToSend = rootState.auth.accessToken.replace(/^"|"$/g, "");
    console.log("getUserInfoThunk accessToken: ", accessToSend);
    try {
      const data = await client("account/getUserInfo", {
        accessToken: accessToSend,
      });

      console.log("getUserInfoThunk success");

      return data;
    } catch (error) {
      console.log("getUserInfoThunk error");
      return rejectWithValue(error.response.data);
    }
  }
);
