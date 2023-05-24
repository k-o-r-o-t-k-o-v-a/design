import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { api } from '../../services/api';

import { fetchUserData } from './userSlice';

const { getWorkspace, getBoards } = api();

export const fetchWorkspace = createAsyncThunk(
    'workspaces/workspace',
    async (workspaceId, thunkAPI) => {
        const workspace = await getWorkspace(workspaceId);
        const boards = await getBoards(workspaceId);
        return {
            workspace: workspace.data,
            boards: boards.data
        };
    }
)

const initialState = {
    workspace: null,
    workspaces: [],
}

const workspacesSlice = createSlice({
    name: 'workspaces',
    initialState,
    reducers: {
        addWorkspaces(state, action) {
            state.workspaces.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserData.fulfilled, (state, action) => {
            state.workspaces = action.payload.workspaces;
        })
        builder.addCase(fetchWorkspace.fulfilled, (state, action) => {
            console.log(44, action.payload)
            state.workspace = action.payload.workspace;
        })
    }
})

export const { addWorkspaces } = workspacesSlice.actions;
export default workspacesSlice.reducer;
