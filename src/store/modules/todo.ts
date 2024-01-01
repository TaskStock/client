import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../configureStore";

interface AddTodoForm {
  todo_id?: number;
  text: string;
  level: number;
  project_id: number | null;
  repeat_day: string[];
}

interface InitialState {
  isAddModalOpen: boolean;
  addTodoForm: AddTodoForm;
}

const initialState: InitialState = {
  isAddModalOpen: false,
  addTodoForm: {
    text: "",
    level: 0,
    project_id: null,
    repeat_day: [],
  },
};

const API_URL_TEMP = "http://localhost:5000";

export const submitTodo = createAsyncThunk(
  `${API_URL_TEMP}/todo/update`,
  async (_, { getState }) => {
    const {
      todo: { addTodoForm },
    } = getState() as RootState;

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
export const { toggleAddModal, setAddTodoForm } = todoSlice.actions;
