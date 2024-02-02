import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store/configureStore";
import { client } from "../../services/api";
import { toggleStateThunk } from "../PushNotification/pushNotiThunk";

export const getUserInfoThunk = createAsyncThunk(
  "user/getUserInfo",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const rootState = getState() as RootState;

    const accessToSend = rootState.auth.accessToken.replace(/^"|"$/g, "");
    // console.log("getUserInfoThunk accessToken: ", accessToSend);
    try {
      const data = await client("account/getUserInfo", {
        accessToken: accessToSend,
      });

      console.log("getUserInfoThunk success");
      const isPushOn = data.userData.is_push_on;
      dispatch(toggleStateThunk(isPushOn));

      return data;
    } catch (error) {
      console.log("getUserInfoThunk error");
      return rejectWithValue(error.response.data);
    }
  }
);
