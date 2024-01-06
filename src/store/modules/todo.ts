import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";
import dayjs from "dayjs";
import { AddTodoForm, Todo } from "../../@types/todo";
import wrappedFetchBaseQuery from "../fetchBaseQuery";
import { chartApi } from "./chart";
import { Value } from "../../@types/chart";

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
    repeat_day: "0000000",
    repeat_end_date: null,
  },
};

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: wrappedFetchBaseQuery,
  endpoints: (builder) => ({
    getAllTodos: builder.query<
      {
        todos: {
          todo_id: number;
          content: string;
          check: boolean;
          date: string;
          level: number;
          index: number;
          user_id: number;
          project_id: number | null;
        }[];
      },
      { date: string }
    >({
      query: (body: { date: string }) => {
        return {
          url: `/todo/read?date=${body.date}`,
          method: "GET",
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
          repeat_day: "0000000",
          repeat_end_date: null,
        };

        return {
          url: "/todo/new",
          method: "POST",
          body: simpleTodoForm,
        };
      },

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        const temp_todo_id = Math.random();

        const todo_replica = {
          content: body.content,
          todo_id: temp_todo_id,
          check: false,
          date: dayjs().toISOString(),
          index: 0,
          project_id: null,
          level: 0,
          repeat_day: "0000000",
          repeat_end_date: null,
        };

        const patchAddTodo = dispatch(
          todoApi.util.updateQueryData(
            "getAllTodos",
            { date: body.queryArgs.date },
            (draft: { todos: Todo[] }) => {
              draft.todos.push(todo_replica);
            }
          )
        );

        try {
          const result = await queryFulfilled;

          const todo_id = result.data.todo_id;

          dispatch(
            todoApi.util.updateQueryData(
              "getAllTodos",
              { date: body.queryArgs.date },
              (draft: { todos: Todo[] }) => {
                const index = draft.todos.findIndex(
                  (todo) => todo.todo_id === temp_todo_id
                );
                if (index === -1) return;
                draft.todos[index].todo_id = todo_id;
              }
            )
          );

          // index랑 date의 경우.
        } catch (error) {
          console.log(error);
          patchAddTodo.undo();
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
        return {
          url: "/todo/new",
          method: "POST",
          body: body.form,
        };
      },

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        const temp_todo_id = Math.random();

        const todo_replica = {
          ...body.form,
          todo_id: temp_todo_id,
          check: false,
          date: dayjs().toISOString(),
          index: 0,
        };

        const patchAddTodo = dispatch(
          todoApi.util.updateQueryData(
            "getAllTodos",
            { date: body.queryArgs.date },
            (draft: { todos: Todo[] }) => {
              draft.todos.push(todo_replica);
            }
          )
        );

        try {
          const result = await queryFulfilled;

          const todo_id = result.data.todo_id;

          dispatch(
            todoApi.util.updateQueryData(
              "getAllTodos",
              { date: body.queryArgs.date },
              (draft: { todos: Todo[] }) => {
                const index = draft.todos.findIndex(
                  (todo) => todo.todo_id === temp_todo_id
                );
                if (index === -1) return;
                draft.todos[index].todo_id = todo_id;
              }
            )
          );

          dispatch(closeTodoModal());
        } catch (error) {
          console.log(error);
          patchAddTodo.undo();
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
        check: boolean;
        todo_date: string;
        value: number;
        queryArgs: {
          date: string;
        };
      }) => {
        return {
          url: "/todo/checktoggle",
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

        if (
          dayjs(body.todo_date).format("YYYY-MM-DD") !==
          dayjs().format("YYYY-MM-DD")
        )
          return;

        const patchResult2 = dispatch(
          chartApi.util.updateQueryData(
            "getValues",
            {},
            (draft: { values: Value[] }) => {
              const index = draft.values.findIndex((value) => {
                const date1 = dayjs(value.date).format("YYYY-MM-DD");
                const date2 = dayjs(body.todo_date).format("YYYY-MM-DD");

                return date1 === date2;
              });

              if (index === -1) return;

              if (body.check) {
                draft.values[index].end += body.value;
              } else {
                draft.values[index].end -= body.value;
              }
            }
          )
        );

        try {
          const result = await queryFulfilled;
        } catch (error) {
          console.log(error);
          patchResult.undo();
          patchResult2.undo();
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
        repeat_day: "0000000",
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
        repeat_day: "0000000",
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
        repeat_day: string;
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
        repeat_day: repeat_day,
        repeat_end_date: repeat_end_date || null,
      };

      if (repeat_end_date) {
        state.isRepeatDateModalOpen = true;
      }
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
