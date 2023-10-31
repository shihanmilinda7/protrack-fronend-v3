import { combineReducers } from "@reduxjs/toolkit";
import saveReducer from "./saveSlice";
import projectAssignSaveReducer from "./projectAssignSaveSlice";
import timeAllocationSaveReducer from "./timeAllocationSaveSlice";
import timeAllocDateReducer from "./timeAllocDateSlice";
import yearMonthPickerReducer from "./year-month-pickerSlice";
import searchReducer from "./searchSlice";
import userDetailReducer from "./userDetailSlice";
import projectReducer from "./project/project-slice";
import dbnameReducer from "./dbnameSlice";

const rootReducer = combineReducers({
  saveReducer,
  projectAssignSaveReducer,
  timeAllocationSaveReducer,
  timeAllocDateReducer,
  yearMonthPickerReducer,
  searchReducer,
  userDetailReducer,
  projectReducer,
  dbnameReducer,
});

export default rootReducer;
