import { createAsyncThunk } from "@reduxjs/toolkit";
import { Asset } from "react-native-image-picker";
import { TRootState } from "../../store/configureStore";
import { getAPIHost } from "../getAPIHost";
import { client } from "../../services/api";
import { checkAndRenewTokens } from "../authUtils/tokenUtils";
import { showErrorToast } from "../showToast";

export const uploadImageThunk = createAsyncThunk(
  "user/uploadImageThunk",
  async (image: Asset, { getState, rejectWithValue, dispatch }) => {
    await dispatch(checkAndRenewTokens());
    const state = getState() as TRootState;
    const { accessToken } = state.auth;

    const formData = new FormData() as any;

    formData.append("image", {
      name: image.fileName,
      type: image.type,
      uri: image.uri,
    });

    const SERVER_URL = getAPIHost();
    const URL = `${SERVER_URL}sns/edit/image`;

    // console.log("formData: ", formData);
    try {
      const res = await fetch(URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      const data = await res.json();
      // console.log("응답: ", data);
      const { result, imagePath } = data;
      if (result === "fail") {
        console.log("서버에서 이미지 업로드 실패");
        return rejectWithValue(data);
      }

      return imagePath;
    } catch (error) {
      console.log("이미지 업로드 실패: ", error);
      showErrorToast("10MB 이하의 이미지를 업로드해주세요.");
      return rejectWithValue(error.response.data);
    }
  }
);

export const setToDefaultImageThunk = createAsyncThunk(
  "user/setToDefaultImageThunk",
  async (_, { getState, rejectWithValue, dispatch }) => {
    await dispatch(checkAndRenewTokens());
    const state = getState() as TRootState;
    const { accessToken } = state.auth;

    try {
      const res = await client.patch("sns/edit/default", {}, { accessToken });
      const { result } = res;

      if (result === "success") {
        return result;
      } else if (result === "fail") {
        console.log("서버에서 이미지 업로드 실패");
        return rejectWithValue(result);
      }
    } catch (error) {
      console.log("기본이미지 변경 실패: ", error);
      showErrorToast("기본이미지 변경에 실패했습니다. 다시 시도해주세요.");
      return rejectWithValue(error.response.data);
    }
  }
);
