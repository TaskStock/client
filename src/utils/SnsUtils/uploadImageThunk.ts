import { createAsyncThunk } from "@reduxjs/toolkit";
import { useAppSelect } from "../../store/configureStore.hooks";
import { getAPIHost } from "../getAPIHost";

export const uploadImageThunk = createAsyncThunk(
  "uploadImageThunk",
  async (image: string) => {
    return image;
    // const SERVER_URL = getAPIHost();
    // const URL = `${SERVER_URL}/sns/edit/image`;
    // const { accessToken } = useAppSelect((state) => state.auth);

    // const formData = new FormData();
    // formData.append("image", image);
    // console.log("formData: ", formData);
    // try {
    //   const res = await fetch(URL, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //     body: formData,
    //   });

    //   const data = await res.json();
    //   return data;
    // } catch (error) {
    //   console.log("이미지 업로드 실패: ", error);
    // }
  }
);
