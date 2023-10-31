import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface dbnameState {
  dbaname: string;
}

const initialState: dbnameState = {
  dbaname: "",
};

const dbnameSlice = createSlice({
  name: "dbname",
  initialState,
  reducers: {
    setDbname: (state, action) => {
      state.dbaname = action.payload;
    },
  },
});

export const { setDbname } = dbnameSlice.actions;

export default dbnameSlice.reducer;
