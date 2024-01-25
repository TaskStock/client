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
import { RetrospectForm } from "../../../@types/retrospect";
import {
  addRetrospectMutation,
  deleteRetrospectMutation,
  updateRetrospectMutation,
} from "./mutations";

interface InitialState {
  retrospectForm: RetrospectForm;
}

const initialState: InitialState = {
  retrospectForm: {
    content: "",
    project_id: null,
    date: dayjs().format("YYYY-MM-DD") as DateString,
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
  },
  extraReducers() {},
});

export default retrospectSlice.reducer;
export const { resetRetrospectForm, setRetrospectForm, editRetrospectForm } =
  retrospectSlice.actions;
export const {
  useGetAllRetrospectQuery,
  useGetAllProjectRetrospectQuery,
  useGetMonthlyRetrospectQuery,
  useAddRetrospectMutation,
  useUpdateRetrospectMutation,
  useDelteRetrospectMutation,
} = retrospectApi;
