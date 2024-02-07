import { createAsyncThunk } from "@reduxjs/toolkit";
import { Asset } from "react-native-image-picker";
import { RootState } from "../../store/configureStore";
import { getAPIHost } from "../getAPIHost";
import { client } from "../../services/api";

export const uploadImageThunk = createAsyncThunk(
  "user/uploadImageThunk",
  async (image: Asset, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
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
      return rejectWithValue(error.response.data);
    }
  }
);

export const setToDefaultImageThunk = createAsyncThunk(
  "user/setToDefaultImageThunk",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
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
      return rejectWithValue(error.response.data);
    }
  }
);
