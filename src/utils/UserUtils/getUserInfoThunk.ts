import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../services/api";
import { RootState } from "../../store/configureStore";
import { setStrategy } from "../../store/modules/auth";
import { addBadge } from "../../store/modules/badge";
import { setTheme } from "../../store/modules/theme";
import { toggleStateThunk } from "../PushNotification/pushNotiThunk";
import { storeData } from "../asyncStorage";
import { checkAndRenewTokens } from "../authUtils/tokenUtils";

// const data = {
//   message: "유저 정보 가져오기 성공",
//   result: "success",
//   userData: {
//     created_time: "2024-02-05T10:49:12.574Z",
//     cumulative_value: 0,
//     email: "",
//     follower_count: 0,
//     following_count: 1,
//     group_id: null,
//     image: "public/images/ic_profile.png",
//     introduce: null,
//     is_push_on: true,
//     language: "korean",
//     premium: 0,
//     private: false,
//     region: "Asia/Seoul",
//     strategy: "local",
//     theme: "dark",
//     user_id: 159,
//     user_name: "",
//     value_yesterday_ago: "0.00",
//   },
//   badges: [],
// };

export const getUserInfoThunk = createAsyncThunk(
  "user/getUserInfo",
  async (_, { rejectWithValue, getState, dispatch }) => {
    await dispatch(checkAndRenewTokens());
    const rootState = getState() as RootState;

    const accessToSend = rootState.auth.accessToken.replace(/^"|"$/g, "");
    // console.log("getUserInfoThunk accessToken: ", accessToSend);
    try {
      const data = await client("account/getUserInfo", {
        accessToken: accessToSend,
      });

      // [테마] redux !== 서버 => 테마 변경
      const clientTheme = rootState.theme.value;
      const serverTheme = data.userData.theme;
      if (clientTheme !== serverTheme) {
        dispatch(setTheme(serverTheme));
      }

      // [푸시알림] redux !== 서버 => 푸시알림 변경
      const clientPush = rootState.pushNoti.isPushOn;
      const serverPush = data.userData.is_push_on;
      if (clientPush !== serverPush) {
        dispatch(toggleStateThunk(serverPush));
      }

      // [strategy] redux !== 서버 => strategy 변경
      const clientStrategy = rootState.auth.strategy;
      const serverStrategy = data.userData.strategy;
      if (clientStrategy !== serverStrategy) {
        dispatch(setStrategy(serverStrategy));
        storeData("strategy", serverStrategy);
      }

      // badge
      dispatch(addBadge(data.badges));

      return data;
    } catch (error) {
      console.log("getUserInfoThunk error");
      return rejectWithValue(error.response.data);
    }
  }
);
