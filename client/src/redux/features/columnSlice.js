import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllColumns as getAllColumnsClient } from "../../api/column";

export const fetchColumns = createAsyncThunk(
  "column/fetchColumns",
  async (boardId) => {
    const res = await getAllColumnsClient(boardId);
    return res.data.map((ele) => ({ title: ele.title, id: ele._id }));
  }
);

const columnSlice = createSlice({
  name: "column",
  initialState: {
    columns: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchColumns.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchColumns.fulfilled, (state, action) => {
        state.loading = false;
        state.columns = action.payload;
      })
      .addCase(fetchColumns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default columnSlice.reducer;
