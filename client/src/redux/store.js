import { combineReducers, configureStore } from "@reduxjs/toolkit";
import boardReducer from "./features/boardSlice";
import columnReducer from "./features/columnSlice";
import taskReducer from "./features/taskSlice";
import counterReducer from "./features/counterSlice";

const rootReducer = combineReducers({
  board: boardReducer,
  column: columnReducer,
  task: taskReducer,
  counter: counterReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
