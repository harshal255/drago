import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllBoards as getAllBoardsClient } from "../../api/board";

export const fetchBoards = createAsyncThunk("board/fetchBoards", async () => {
  const res = await getAllBoardsClient();
  // console.log("fetch boards called", res);
  return res.data.map((ele) => ({ title: ele.title, id: ele._id }));
});

// console.log({ fetchBoards });

const boardSlice = createSlice({
  name: "board",
  initialState: {
    boards: [],
    boardId: "",
    loading: false,
    error: null,
    currentBoard: {},
  },
  reducers: {
    setBoardId: (state, action) => {
      state.boardId = action.payload;
    },
    clearBoards: (state) => {
      state.boards = [];
      state.boardId = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        // console.log("📡 fetchBoards → pending...");
        state.loading = true;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        // console.log("✅ Fetched boards:", action.payload);
        state.loading = false;
        state.boards = action.payload;
        if (action.payload.length > 0) {
          state.boardId = action.payload[0].id;
          // console.log("🟢 Default boardId set:", state.boardId);
        }
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        console.log("❌ fetchBoards → rejected:", action.error.message);
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setBoardId, clearBoards, setCurrentBoard } = boardSlice.actions;
export default boardSlice.reducer;
