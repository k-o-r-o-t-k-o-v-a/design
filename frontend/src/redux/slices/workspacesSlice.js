import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { api } from '../../services/api';

import { fetchUserData } from './userSlice';

const {
	getWorkspace,
	getBoards,
	setUserLastWorkspace,
	getMembers,
	getTags,
	getSchedules,
	getCalendar,
	getWorkspaceMemberRole
} = api();

export const fetchWorkspace = createAsyncThunk(
	'workspaces/workspace',
	async (workspaceId, thunkAPI) => {
		const workspace = await getWorkspace(workspaceId);
		const boards = await getBoards(workspaceId);
		const members = await getMembers(workspaceId);
		const tags = await getTags(workspaceId);
		const schedules = await getSchedules(workspaceId)
		const calendar = await getCalendar(workspaceId);
		const memberRole = await getWorkspaceMemberRole(workspaceId);
		await setUserLastWorkspace(workspaceId);
		return {
			workspace: workspace.data,
			boards: boards.data,
			members: members.data,
			tags: tags.data,
			schedules: schedules.data,
			calendar: calendar.data,
			memberRole: memberRole.data,
		};
	}
);

const initialState = {
	workspaces: [],
	workspace: null,
	tags: [],
	memberRole: null,
}

const workspacesSlice = createSlice({
	name: 'workspaces',
	initialState,
	reducers: {
		setWorkspace(state, action) {
			state.workspace = action.payload;
		},
		addWorkspaces(state, action) {
			state.workspaces.push(action.payload);
			state.workspace = action.payload;
		},
		delWorkspace(state, action) {
			state.workspaces = state.workspaces.filter(item => item.id != action.payload);
			state.workspace = null;
			state.tags = [];
		},
		upWorkspace(state, action) {
			const { id, name } = action.payload;
			const index = state.workspaces.findIndex(workspace => workspace.id == id);
			if (index !== -1) {
				const newArray = [...state.workspaces];
				newArray[index] = { ...newArray[index], name };
				state.workspaces = newArray;
			}
			state.workspace = { ...state.workspace, name: action.payload.name };
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUserData.fulfilled, (state, action) => {
			state.workspaces = action.payload.workspaces;
		})
		builder.addCase(fetchWorkspace.fulfilled, (state, action) => {
			state.workspace = action.payload.workspace;
			state.tags = action.payload.tags;
			state.memberRole = action.payload.memberRole;
		})
	}
})

export const {
	addWorkspaces,
	setWorkspace,
	delWorkspace,
	upWorkspace
} = workspacesSlice.actions;
export default workspacesSlice.reducer;