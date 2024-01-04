import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

interface Project {
  id: string;
  title: string;
  reviewCount: number;
  todoCount: number;
  isPublic: boolean;
}

interface InitialState {
  projects: Project[];
  selectedProjectId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  projects: [],
  selectedProjectId: null,
  loading: false,
  error: null,
};

const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({}),
});

const projectSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers() {},
});

export default projectSlice.reducer;
export const {} = projectSlice.actions;
