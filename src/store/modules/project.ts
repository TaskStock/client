import { LOCAL_API_HOST_IOS } from "@env";
import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { myFetchFunction } from "../myFetchFunction";

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

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: myFetchFunction("df"),
  endpoints: (builder) => ({
    getAllProjects: builder.query<Project[], void>({
      query: () => ({
        url: "/project",
        method: "GET",
      }),
    }),

    addProject: builder.mutation<Project, { title: string }>({
      query: (body) => ({
        url: "/project",
        method: "POST",
        body,
      }),
    }),

    deleteProject: builder.mutation<Project, { id: string }>({
      query: (body) => ({
        url: `/project/${body.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

const projectSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers() {},
});

export default projectSlice.reducer;
export const {} = projectSlice.actions;
