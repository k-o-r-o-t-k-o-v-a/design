import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// import { api } from '../../services/api';
import { fetchWorkspace } from './workspacesSlice';

// import { fetchUserData } from './userSlice';

// const {
// 	getWorkspace,
// 	getBoards,
// 	setUserLastWorkspace,
// 	getMembers,
// } = api();

// export const fetchWorkspace = createAsyncThunk(
// 	'workspaces/workspace',
// 	async (workspaceId, thunkAPI) => {
// 		const workspace = await getWorkspace(workspaceId);
// 		const boards = await getBoards(workspaceId);
// 		const members = await getMembers(workspaceId);
// 		await setUserLastWorkspace(workspaceId);
// 		return {
// 			workspace: workspace.data,
// 			boards: boards.data,
// 			members: members.data,
// 		};
// 	}
// )

const initialState = {
	calendar: [],
	schedules: [],
}

const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		// removeMemberById(state, action) {
		// 	state.members = state.members.filter(item => item.id !== action.payload);
		// }
	},
	extraReducers: (builder) => {
		builder.addCase(fetchWorkspace.fulfilled, (state, action) => {
			state.calendar = action.payload.calendar;
			state.schedules = action.payload.schedules;
		})
	}
})

export const { } = calendarSlice.actions;
export default calendarSlice.reducer;