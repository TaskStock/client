import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { myFetchFunction } from "../../myFetchFunction";
import { Project, ProjectForm, publicType } from "../../../@types/project";
import { getAllProjectsQuery } from "./queries";
import {
  addProjectMutation,
  deleteProjectMutation,
  updateProjectMutation,
} from "./mutations";

type keyOfProjectForm = keyof ProjectForm;

interface InitialState {
  projects: Project[];
  selectedProjectId: number | null;
  loading: boolean;
  error: string | null;
  projectForm: ProjectForm;
}

const initialState: InitialState = {
  projects: [],
  selectedProjectId: null,
  loading: false,
  error: null,
  projectForm: {
    project_id: undefined,
    name: "",
    public_range: "all",
    finished: false,
  },
};

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: myFetchFunction("df"),
  tagTypes: ["Project"],
  endpoints: (builder) => ({
    getAllProjects: getAllProjectsQuery(builder),
    addProject: addProjectMutation(builder),
    deleteProject: deleteProjectMutation(builder),
    updateProject: updateProjectMutation(builder),
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
    resetProjectForm(state) {
      state.projectForm = {
        project_id: undefined,
        name: "",
        public_range: "all",
        finished: false,
      };
    },
    setProjectForm(
      state,
      action: {
        payload: {
          name: keyOfProjectForm;
          value: string | boolean;
        };
      }
    ) {
      Object.assign(state.projectForm, {
        [action.payload.name]: action.payload.value,
      });
    },
    editProjectForm(
      state,
      action: {
        payload: {
          project_id: number;
          name: string;
          public_range: publicType;
          finished: boolean;
        };
      }
    ) {
      Object.assign(state.projectForm, {
        project_id: action.payload.project_id,
        name: action.payload.name,
        public_range: action.payload.public_range,
        finished: action.payload.finished,
      });
    },
  },
  extraReducers() {},
});

export default projectSlice.reducer;
export const {
  setSelectedProjectId,
  setProjectForm,
  editProjectForm,
  resetProjectForm,
} = projectSlice.actions;
export const {
  useGetAllProjectsQuery,
  useAddProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
} = projectApi;
