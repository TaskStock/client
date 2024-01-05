import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../configureStore";
import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { LOCAL_API_HOST } from "@env";
import dayjs from "dayjs";
import { AddTodoForm, Todo } from "../../@types/todo";

interface InitialState {
  isTodoDrawerOpen: boolean;
  isAddModalOpen: boolean;
  todoDrawerPosition: number;
  isRepeatDateModalOpen: boolean;
  addTodoForm: AddTodoForm;
}

const initialState: InitialState = {
  isTodoDrawerOpen: false,
  isAddModalOpen: false,
  todoDrawerPosition: 0,
  isRepeatDateModalOpen: false,
  addTodoForm: {
    content: "",
    level: 0,
    project_id: null,
    repeat_day: [],
    repeat_end_date: null,
  },
};

const originalBaseQuery = fetchBaseQuery({
  baseUrl: LOCAL_API_HOST,
  prepareHeaders: (headers, { getState, endpoint, extra, type, forced }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const wrappedFetchBaseQuery = (...args) => {
  console.log("making api call", ...args);
  return originalBaseQuery(...args);
};

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: wrappedFetchBaseQuery,
  endpoints: (builder) => ({
    getAllTodos: builder.query<Todo[], { date: string }>({
      query: (body: { date: string }) => {
        return {
          url: "/todo/read",
          method: "POST",
          body,
        };
      },
    }),
    addTodo: builder.mutation<
      {
        todo_id: number;
      },
      { form: AddTodoForm }
    >({
      query: (body: { form: AddTodoForm }) => {
        return {
          url: "/todo/new",
          method: "POST",
          body: body.form,
        };
      },

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          const todo_replica = {
            ...body.form,
            todo_id: result.data.todo_id,
            check: false,
            date: dayjs().toISOString(),
            index: 0,
          };

          dispatch(
            todoApi.util.updateQueryData(
              "getAllTodos",
              undefined,
              (draft: Todo[]) => {
                draft.push(todo_replica);
              }
            )
          );
          dispatch(closeTodoModal());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    editTodo: builder.mutation<
      {},
      {
        form: AddTodoForm;
      }
    >({
      query: (body: { form: AddTodoForm }) => {
        return {
          url: "/todo/update",
          method: "POST",
          body: body.form,
        };
      },

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            todoApi.util.updateQueryData(
              "getAllTodos",
              undefined,
              (draft: Todo[]) => {
                const index = draft.findIndex(
                  (todo) => todo.todo_id === body.form.todo_id
                );
                if (index === -1) return;
                draft[index] = {
                  ...body.form,
                  todo_id: draft[index].todo_id,
                  check: draft[index].check,
                  date: draft[index].date,
                  index: draft[index].index,
                };
              }
            )
          );
          dispatch(closeTodoModal());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    toggleTodo: builder.mutation({
      query: (body: { todo_id: number }) => {
        return {
          url: "/todo/toggle",
          method: "POST",
          body,
        };
      },

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            todoApi.util.updateQueryData(
              "getAllTodos",
              undefined,
              (draft: Todo[]) => {
                const index = draft.findIndex(
                  (todo) => todo.todo_id === body.todo_id
                );
                draft[index].check = !draft[index].check;
              }
            )
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    closeTodoModal(state) {
      state.isAddModalOpen = false;
      state.isRepeatDateModalOpen = false;
      state.addTodoForm = {
        todo_id: null,
        content: "",
        level: 0,
        project_id: null,
        repeat_day: [],
        repeat_end_date: null,
      };
    },
    openAddTodoModal(state) {
      state.isAddModalOpen = true;
      state.addTodoForm = {
        todo_id: null,
        content: "",
        level: 0,
        project_id: null,
        repeat_day: [],
        repeat_end_date: null,
      };
    },
    openEditTodoModal(
      state,
      action: PayloadAction<{
        todo_id: number;
        text: string;
        level: number;
        project_id: number | null;
        repeat_day: string[];
        repeat_end_date: string | null;
      }>
    ) {
      const { todo_id, text, level, project_id, repeat_day, repeat_end_date } =
        action.payload;

      if (!todo_id) return;

      state.isAddModalOpen = true;

      state.addTodoForm = {
        todo_id: todo_id,
        content: text,
        level: level,
        project_id: project_id || null,
        repeat_day: repeat_day || [],
        repeat_end_date: repeat_end_date || null,
      };

      if (repeat_end_date) {
        state.isRepeatDateModalOpen = true;
      }
    },
    toggleRepeatEndModal(state) {
      if (!state.isRepeatDateModalOpen) {
        state.addTodoForm.repeat_end_date = dayjs().toISOString();
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
    toggleTodoDrawer(state) {
      state.isTodoDrawerOpen = !state.isTodoDrawerOpen;
    },
    setTodoDrawerPosition(state, payload) {
      state.todoDrawerPosition = payload.payload;
    },
  },
});

export default todoSlice.reducer;
export const {
  openAddTodoModal,
  openEditTodoModal,
  closeTodoModal,
  setAddTodoForm,
  toggleRepeatEndModal,
  toggleTodoDrawer,
  setTodoDrawerPosition,
} = todoSlice.actions;

export const {
  useGetAllTodosQuery,
  useAddTodoMutation,
  useEditTodoMutation,
  useToggleTodoMutation,
} = todoApi;
