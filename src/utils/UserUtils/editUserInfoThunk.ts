import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store/configureStore";
import { client } from "../../services/api";

export const editUserInfoThunk = createAsyncThunk(
  "user/editUserInfo",
  async (
    info: { user_name: string; introduce: string },
    { rejectWithValue, getState }
  ) => {
    const rootState = getState() as RootState;
    const accessToSend = rootState.auth.accessToken.replace(/^"|"$/g, "");
    try {
      const data = await client.patch(
        "sns/edit/info",
        { ...info },
        {
          accessToken: accessToSend,
        }
      );
      console.log(info, accessToSend);

      if (data.result === "success") {
        return info;
      }
    } catch (error) {
      console.log("editUserInfoThunk error");
      return rejectWithValue(error.response.data);
    }
  }
);
