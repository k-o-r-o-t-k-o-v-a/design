import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchWorkspace } from './workspacesSlice';

const initialState = {
    board: null,
    boards: [],
}

const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWorkspace.fulfilled, (state, action) => {
            state.boards = action.payload.boards;
        })
    }
})

export const { } = boardsSlice.actions;
export default boardsSlice.reducer;
