import { createApi } from "@reduxjs/toolkit/query/react";
import { myFetchFunction } from "../../myFetchFunction";
import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProjectRetrospectQuery,
  getAllRetrospectQuery,
  getMonthlyRetrospectQuery,
} from "./queries";
import { DateString } from "../../../@types/calendar";
import dayjs from "dayjs";
import { Retrospect, RetrospectForm } from "../../../@types/retrospect";
import {
  addRetrospectMutation,
  deleteRetrospectMutation,
  updateRetrospectMutation,
} from "./mutations";

interface InitialState {
  retrospectForm: RetrospectForm;
  allRetrospectQueries: {
    offset: number;
    searchKeyword: string;
    selectedFilter: "latest" | "earliest";
    list: Retrospect[];
  };
  projectRetrospectQueries: {
    offset: number;
    searchKeyword: string;
    selectedFilter: "latest" | "earliest";
    list: Retrospect[];
  };
}

const initialState: InitialState = {
  retrospectForm: {
    content: "",
    project_id: null,
    date: dayjs().format("YYYY-MM-DD") as DateString,
  },
  allRetrospectQueries: {
    offset: 0,
    searchKeyword: "",
    selectedFilter: "latest",
    list: [],
  },
  projectRetrospectQueries: {
    offset: 0,
    searchKeyword: "",
    selectedFilter: "latest",
    list: [],
  },
};

export const retrospectApi = createApi({
  reducerPath: "retrospectApi",
  baseQuery: myFetchFunction("df"),
  tagTypes: ["retrospect", "projectRetrospect", "monthlyRetrospect"],
  endpoints: (builder) => ({
    getAllRetrospect: getAllRetrospectQuery(builder),
    getAllProjectRetrospect: getAllProjectRetrospectQuery(builder),
    getMonthlyRetrospect: getMonthlyRetrospectQuery(builder),
    addRetrospect: addRetrospectMutation(builder),
    updateRetrospect: updateRetrospectMutation(builder),
    delteRetrospect: deleteRetrospectMutation(builder),
  }),
});

const retrospectSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    resetRetrospectForm(
      state,
      action: {
        payload: {
          project_id?: number;
        };
      }
    ) {
      state.retrospectForm = {
        content: "",
        project_id: action.payload.project_id || null,
        date: dayjs().format("YYYY-MM-DD") as DateString,
        retrospect_id: undefined,
      };
    },
    setRetrospectForm(
      state,
      action: {
        payload: {
          name: keyof RetrospectForm;
          value: string | boolean | number | null;
        };
      }
    ) {
      Object.assign(state.retrospectForm, {
        [action.payload.name]: action.payload.value,
      });
    },
    editRetrospectForm(
      state,
      action: {
        payload: {
          retrospect_id: number;
          content: string;
          date: DateString;
          project_id: number;
        };
      }
    ) {
      Object.assign(state.retrospectForm, {
        retrospect_id: action.payload.retrospect_id,
        content: action.payload.content,
        date: action.payload.date,
        project_id: action.payload.project_id,
      });
    },
    resetAllRetrospectQueries(state) {
      state.allRetrospectQueries = {
        offset: 0,
        searchKeyword: "",
        selectedFilter: "latest",
        list: [],
      };
    },
    setAllRetrospectQueries(
      state,
      action: {
        payload: {
          offset?: number;
          searchKeyword?: string;
          selectedFilter?: "latest" | "earliest";
          list?: Retrospect[];
        };
      }
    ) {
      Object.assign(state.allRetrospectQueries, action.payload);
    },
    increateAllRetrospectQueriesOffset(state) {
      state.allRetrospectQueries.offset += 1;
    },
    resetProjectRetrospectQueries(state) {
      state.projectRetrospectQueries = {
        offset: 0,
        searchKeyword: "",
        selectedFilter: "latest",
        list: [],
      };
    },
    setProjectRetrospectQueries(
      state,
      action: {
        payload: {
          offset?: number;
          searchKeyword?: string;
          selectedFilter?: "latest" | "earliest";
          list?: Retrospect[];
        };
      }
    ) {
      console.log("setProjectRetrospectQueries", action.payload);

      Object.assign(state.projectRetrospectQueries, action.payload);
    },
    increateProjectRetrospectQueriesOffset(state) {
      state.projectRetrospectQueries.offset += 1;
    },
  },
  extraReducers() {},
});

export default retrospectSlice.reducer;
export const {
  resetRetrospectForm,
  resetAllRetrospectQueries,
  setAllRetrospectQueries,
  setRetrospectForm,
  editRetrospectForm,
  resetProjectRetrospectQueries,
  setProjectRetrospectQueries,
  increateAllRetrospectQueriesOffset,
  increateProjectRetrospectQueriesOffset,
} = retrospectSlice.actions;
export const {
  useGetAllRetrospectQuery,
  useGetAllProjectRetrospectQuery,
  useGetMonthlyRetrospectQuery,
  useAddRetrospectMutation,
  useUpdateRetrospectMutation,
  useDelteRetrospectMutation,
} = retrospectApi;
