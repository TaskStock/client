import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi, EndpointBuilder } from "@reduxjs/toolkit/query/react";
import dayjs from "dayjs";
import { AddTodoForm } from "../../../@types/todo";
import wrappedFetchBaseQuery from "../../fetchBaseQuery";
import {
  addSimpleTodoMutation,
  addTodoMutation,
  deleteTodoMutation,
  editTodoMutation,
  toggleTodoMutation,
} from "./mutations";
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { getAllTodosQuery } from "./queries";

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
    todo_id: null,
    content: "",
    level: 0,
    project_id: null,
    repeat_day: "0000000",
    repeat_end_date: null,
  },
};

export type TodoApiBuilder = EndpointBuilder<
  (...args: any[]) => MaybePromise<QueryReturnValue<unknown, unknown, {}>>,
  never,
  "todoApi"
>;

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: wrappedFetchBaseQuery,
  endpoints: (builder) => ({
    getAllTodos: getAllTodosQuery(builder),
    addSimpleTodo: addSimpleTodoMutation(builder),
    addTodo: addTodoMutation(builder),
    editTodo: editTodoMutation(builder),
    toggleTodo: toggleTodoMutation(builder),
    deleteTodo: deleteTodoMutation(builder),
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
        original_level: 0,
        todo_date: "",
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

    // FIXME: 만약 반복이 수정된 경우라면?
    // 혹은 추가할때 반복이 된 경우라면?
    // 그럼 캐싱을 다 해제해주어야 한다.

    // 어디서? addTodo랑, editTodo 부분에서.
    openEditTodoModal(
      state,
      action: PayloadAction<{
        todo_id: number;
        text: string;
        level: number;
        date: string;
        project_id: number | null;
        repeat_day: string | null;
        repeat_end_date: string | null;
      }>
    ) {
      const {
        todo_id,
        text,
        date,
        level,
        project_id,
        repeat_day,
        repeat_end_date,
      } = action.payload;

      if (!todo_id) return;

      state.isAddModalOpen = true;

      console.log("openEditTodoModal", date);

      state.addTodoForm = {
        todo_id: todo_id,
        content: text,
        level: level,
        original_level: level,
        todo_date: date,
        project_id: project_id || null,
        repeat_day: repeat_day || "0000000",
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
      Object.assign(state.addTodoForm, {
        [action.payload.name]: action.payload.value,
      });
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
