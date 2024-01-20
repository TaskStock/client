import { createAsyncThunk } from "@reduxjs/toolkit";
import { Asset } from "react-native-image-picker";
import { RootState } from "../../store/configureStore";
import { getAPIHost } from "../getAPIHost";

export const uploadImageThunk = createAsyncThunk(
  "uploadImageThunk",
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

    console.log("formData: ", formData);
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
      console.log("응답: ", data);
      if (data.result === "fail") {
        console.log("서버에서 이미지 업로드 실패");
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      console.log("이미지 업로드 실패: ", error);
      return rejectWithValue(error.response.data);
    }
  }
);
