import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { api } from '../../services/api';
import { _formattingBoardData } from '../../services/formatting';

import { fetchWorkspace } from './workspacesSlice';

const { getBoardData, updateTaskPosition } = api();

export const fetchBoardData = createAsyncThunk(
	'boards/data',
	async (boardId, thunkAPI) => {
		const res = await getBoardData(boardId);
		const boardData = _formattingBoardData(res.data.boardData);
		return { board: res.data.board, boardData };
	}
);

// export const fetchUpdateTaskPosition = createAsyncThunk(
// 	'boards/data/tasks',
// 	async (data, thunkAPI) => {
// 		await updateTaskPosition(data);
// 	}
// )

const initialState = {
	board: null,
	boards: [],
	boardsData: {},
}

const boardsSlice = createSlice({
	name: 'boards',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchWorkspace.fulfilled, (state, action) => {
			state.boards = action.payload.boards;
		})
		builder.addCase(fetchBoardData.fulfilled, (state, action) => {
			state.board = action.payload.board;
			state.boardsData = action.payload.boardData;
		})
	}
})

export const { } = boardsSlice.actions;
export default boardsSlice.reducer;