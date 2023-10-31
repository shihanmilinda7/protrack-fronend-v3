import { createSlice } from "@reduxjs/toolkit";

interface projectState {
  taskItemList: any[];
}

const initialState: projectState = {
  taskItemList: [],
};

const projectSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setTaskItemList: (state, action) => {
      state.taskItemList = action.payload;
    },
  },
});

export const { setTaskItemList } = projectSlice.actions;

export default projectSlice.reducer;
