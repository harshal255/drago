import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllTasksByBoardId } from "../../api/task";

export const fetchTasks = createAsyncThunk(
  "task/fetchTasks",
  async (boardId) => {
    const res = await getAllTasksByBoardId(boardId);
    return res.data.map((ele) => ({
      title: ele.title,
      id: ele._id,
      column_id: ele.column_id,
      priority: ele.priority,
      description: ele.description,
      dueDate: ele.dueDate,
      color: ele.color,
      board_id: ele.board_id,
      order: ele.order,
    }));
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default taskSlice.reducer;
