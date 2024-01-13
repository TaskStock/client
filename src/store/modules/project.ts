import { LOCAL_API_HOST_IOS } from "@env";
import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { myFetchFunction } from "../myFetchFunction";
import { Project } from "../../@types/project";

interface InitialState {
  projects: Project[];
  selectedProjectId: number | null;
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
    getAllProjects: builder.query<
      {
        projects: Project[];
      },
      void
    >({
      query: () => ({
        url: "/project/all",
        method: "GET",
      }),
    }),

    addProject: builder.mutation<
      {
        result: "success";
      },
      {
        name: string;
        ispublic: boolean;
      }
    >({
      query: (body) => ({
        url: "/project",
        method: "POST",
        body: {
          name: body.name,
          ispublic: body.ispublic,
        },
      }),
    }),

    deleteProject: builder.mutation<Project, { id: string }>({
      query: (body) => ({
        url: `/project/${body.id}`,
        method: "DELETE",
      }),
    }),

    updateProject: builder.mutation<
      {
        result: "success";
      },
      {
        project_id: number;
        name: string;
        ispublic: boolean;
      }
    >({
      query: (body) => ({
        url: `/project`,
        method: "PUT",
        body: {
          project_id: body.project_id,
          name: body.name,
          ispublic: body.ispublic,
        },
      }),
    }),
  }),
});

const projectSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setSelectedProjectId(
      state,
      action: {
        payload: number | null;
      }
    ) {
      state.selectedProjectId = action.payload;
    },
  },
  extraReducers() {},
});

export default projectSlice.reducer;
export const { setSelectedProjectId } = projectSlice.actions;
export const {
  useGetAllProjectsQuery,
  useAddProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
