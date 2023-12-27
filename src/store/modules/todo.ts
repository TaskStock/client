import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddModalOpen: true,
  addTodoForm: {
    text: "",
    value: 0,
    project: "",
  },
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    toggleAddModal(state) {
      state.isAddModalOpen = !state.isAddModalOpen;
    },
  },
});

export default todoSlice.reducer;
export const { toggleAddModal } = todoSlice.actions;
