import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../../services/api';
import { _formattingBaseColors } from '../../services/formatting';
import { splittingColors } from '../../services/splitColors';

const { getUserData, getNotification, getTheme } = api();

export const fetchUserData = createAsyncThunk(
	'user/data',
	async (thunkAPI) => {
		const data = await getUserData();
		const notifications = await getNotification();
		const themes = await getTheme();
		const colorsBase = _formattingBaseColors(data.data.baseColors);
		const colorsPalette = splittingColors(colorsBase);
		return {
			...data.data,
			theme: data.data.baseColors,
			themes: themes.data,
			notifications: notifications.data,
			colors: { colorsBase, colorsPalette }
		};
	}
)

const initialState = {
	user: null,
	isAuth: localStorage.getItem('token') ? true : false,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setIsAuth(state, action) {
			state.isAuth = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUserData.fulfilled, (state, action) => {
			state.user = action.payload.user;
		})
	}
})

export const { setIsAuth } = userSlice.actions;
export default userSlice.reducer;