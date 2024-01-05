import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../configureStore";
import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { LOCAL_API_HOST } from "@env";
import dayjs from "dayjs";
import { AddTodoForm, Todo } from "../../@types/todo";
import { client } from "../../services/api";
import { logout, setAccessToken } from "./auth";

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
    const rootState = getState() as RootState;

    const token = rootState.auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const BaseQueryWithAuth: BaseQueryFn<
  string | { url: string; method: string; body: any },
  unknown,
  unknown
> = async (args, api, extraOptions) => {
  let result = await originalBaseQuery(args, api, extraOptions);

  if (result.error && result.error.originalStatus === 401) {
    // try to get a new token
    const rootState = api.getState() as RootState;

    const refreshToken = rootState.auth.refreshToken;

    if (!refreshToken) {
      api.dispatch(logout());
      return;
    }

    const refreshResult = await fetch(`${LOCAL_API_HOST}/account/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (refreshResult.ok) {
      const response = await refreshResult.json();
      const newAccessToken = response.accessToken;

      api.dispatch(setAccessToken(newAccessToken));

      result = await originalBaseQuery(args, api, extraOptions);
      return result;
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

const wrappedFetchBaseQuery = (...args) => {
  console.log("making api call", ...args);
  return BaseQueryWithAuth(...args);
};

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: wrappedFetchBaseQuery,
  endpoints: (builder) => ({
    getAllTodos: builder.query<
      {
        todos: Todo[];
      },
      { date: string }
    >({
      query: (body: { date: string }) => {
        return {
          url: "/todo/read",
          method: "POST",
          body,
        };
      },
    }),
    addSimpleTodo: builder.mutation<
      {
        todo_id: number;
      },
      {
        content: string;
        queryArgs: {
          date: string;
        };
      }
    >({
      query: (body: { content: string }) => {
        const simpleTodoForm: AddTodoForm = {
          todo_id: null,
          content: body.content,
          level: 0,
          project_id: null,
          repeat_day: [],
          repeat_end_date: null,
        };

        return {
          url: "/todo/new",
          method: "POST",
          body: simpleTodoForm,
        };
      },

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          // index랑 date의 경우.
          const todo_replica = {
            content: body.content,
            todo_id: result.data.todo_id,
            check: false,
            date: dayjs().toISOString(),
            index: 0,
            project_id: null,
            level: 0,
            repeat_day: [],
            repeat_end_date: null,
          };

          dispatch(
            todoApi.util.updateQueryData(
              "getAllTodos",
              { date: body.queryArgs.date },
              (draft: { todos: Todo[] }) => {
                draft.todos.push(todo_replica);
              }
            )
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    addTodo: builder.mutation<
      {
        todo_id: number;
      },
      {
        form: AddTodoForm;
        queryArgs: {
          date: string;
        };
      }
    >({
      query: (body: { form: AddTodoForm }) => {
        // if (body.form.content === "" || body.form.content.length > 30) {
        //   throw new Error("content is empty or too long");
        // }

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
              { date: body.queryArgs.date },
              (draft: { todos: Todo[] }) => {
                draft.todos.push(todo_replica);
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
        queryArgs: {
          date: string;
        };
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
        const patchUpdateTodo = dispatch(
          todoApi.util.updateQueryData(
            "getAllTodos",
            { date: body.queryArgs.date },
            (draft: { todos: Todo[] }) => {
              const index = draft.todos.findIndex(
                (todo) => todo.todo_id === body.form.todo_id
              );
              draft.todos[index] = {
                ...draft.todos[index],
                ...body.form,
              };
            }
          )
        );

        dispatch(closeTodoModal());

        try {
          const result = await queryFulfilled;
        } catch (error) {
          console.log(error);
          patchUpdateTodo.undo();
        }
      },
    }),
    toggleTodo: builder.mutation({
      query: (body: {
        todo_id: number;
        queryArgs: {
          date: string;
        };
      }) => {
        return {
          url: "/todo/toggle",
          method: "POST",
          body,
        };
      },

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todoApi.util.updateQueryData(
            "getAllTodos",
            { date: body.queryArgs.date },
            (draft: { todos: Todo[] }) => {
              const index = draft.todos.findIndex(
                (todo) => todo.todo_id === body.todo_id
              );
              draft.todos[index].check = !draft.todos[index].check;
            }
          )
        );

        try {
          const result = await queryFulfilled;
        } catch (error) {
          console.log(error);
          patchResult.undo();
        }
      },
    }),
    deleteTodo: builder.mutation<
      {},
      {
        todo_id: number;
        queryArgs: {
          date: string;
        };
      }
    >({
      query: (body: {
        todo_id: number;
        queryArgs: {
          date: string;
        };
      }) => {
        return {
          url: "/todo/delete",
          method: "DELETE",
          body,
        };
      },

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todoApi.util.updateQueryData(
            "getAllTodos",
            { date: body.queryArgs.date },
            (draft: { todos: Todo[] }) => {
              const index = draft.todos.findIndex(
                (todo) => todo.todo_id === body.todo_id
              );
              draft.todos.splice(index, 1);
            }
          )
        );

        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
          patchResult.undo();
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
  setTodoDrawerPosition,
} = todoSlice.actions;

export const {
  useGetAllTodosQuery,
  useAddTodoMutation,
  useAddSimpleTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
  useToggleTodoMutation,
} = todoApi;
