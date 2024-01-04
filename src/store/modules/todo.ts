import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../configureStore";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LOCAL_API_HOST } from "@env";
import dayjs from "dayjs";

interface AddTodoForm {
  todo_id?: number;
  text: string;
  level: number;
  project_id: number | null;
  repeat_day: string[];
  repeat_end_date?: string | null;
}

interface InitialState {
  isAddModalOpen: boolean;
  isRepeatDateModalOpen: boolean;
  addTodoForm: AddTodoForm;
}

const initialState: InitialState = {
  isAddModalOpen: false,
  isRepeatDateModalOpen: false,
  addTodoForm: {
    text: "",
    level: 0,
    project_id: null,
    repeat_day: [],
    repeat_end_date: null,
  },
};

export const submitTodo = createAsyncThunk(
  `${LOCAL_API_HOST}/todo/update`,
  async (_, { getState }) => {
    const {
      todo: { addTodoForm },
    } = getState() as RootState;

    console.log(addTodoForm);

    try {
      const response = await fetch("/todo/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addTodoForm),
      });

      const result = await response.json();

      if (!result.ok) {
        throw new Error("서버에 문제가 있습니다.");
      }

      return result;
    } catch (error) {
      throw error;
    }
  }
);

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: LOCAL_API_HOST,
    prepareHeaders: (headers, { getState, endpoint, extra, type, forced }) => {
      const token = getState().auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllTodos: builder.query({
      query: (body: { date: string }) => {
        return {
          url: "/todo/read",
          method: "POST",
          body,
        };
      },
    }),
    addTodo: builder.mutation({
      query: (body: {
        text: string;
        level: number;
        project_id: number | null;
        repeat_day: string[];
      }) => {
        return {
          url: "/todo/new",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    toggleAddModal(state) {
      state.isAddModalOpen = !state.isAddModalOpen;
    },
    editTodo(state, action) {
      state.isAddModalOpen = true;
      // -> state에 해당하는 todo를 불러와서, addTOdoForm에 넣어준다.
      state.addTodoForm = {
        text: action.payload.text,
        level: 0,
        project_id: null,
        repeat_day: [],
      };
    },
    openAddTodoModal(state) {
      state.isAddModalOpen = true;
      state.addTodoForm = {
        text: "",
        level: 0,
        project_id: null,
        repeat_day: [],
      };
    },
    toggleRepeatEndModal(state) {
      if (!state.isRepeatDateModalOpen) {
        state.addTodoForm.repeat_end_date = dayjs().format("YYYY-MM-DD");
      } else {
        state.addTodoForm.repeat_end_date = null;
      }
      state.isRepeatDateModalOpen = !state.isRepeatDateModalOpen;
    },
    setAddTodoForm(
      state,
      action: {
        payload: {
          name: keyof AddTodoForm;
          value: string | number | string[];
        };
      }
    ) {
      state.addTodoForm[action.payload.name] = action.payload.value;
    },
  },
  extraReducers(builder) {
    builder.addCase(submitTodo.fulfilled, (state, action) => {
      // console.log(action.payload.message);
      state.isAddModalOpen = false;
    });
    builder.addCase(submitTodo.rejected, (state, action) => {
      console.log(action.error.message);
      state.isAddModalOpen = false;
    });
  },
});

export default todoSlice.reducer;
export const { toggleAddModal, setAddTodoForm, toggleRepeatEndModal } =
  todoSlice.actions;
export const { useGetAllTodosQuery } = todoApi;
