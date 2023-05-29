import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchUserData } from './userSlice';


const initialState = {
	notifications: [],
}

const notificationsSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers: {
		removeNotifications(state, action) {
			state.notifications = state.notifications.filter(item => item.id !== action.payload);
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUserData.fulfilled, (state, action) => {
			state.notifications = action.payload.notifications;
		})
	}
})

export const { removeNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;