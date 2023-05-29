import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../../services/api';
import { splittingColors } from '../../services/splitColors';
import { _formattingBaseColors } from '../../services/formatting';
import { fetchUserData } from './userSlice';

const { getColorsBaseById } = api();

export const fetchColorsBaseById = createAsyncThunk(
	'colors/base',
	async (colorsBaseId, thunkAPI) => {
		const resColors = await getColorsBaseById(colorsBaseId);
		const colorsBase = _formattingBaseColors(resColors);
		const colorsPalette = splittingColors(colorsBase);
		return {
			theme: resColors,
			colorsBase,
			colorsPalette
		};
	}
)

// export const fetchInstallTheme = createAsyncThunk(
// 	'colors/install',
// 	async (colorsBaseId, thunkAPI) => {
// 		const resColors = await getColorsBaseById(colorsBaseId);
// 		const colorsBase = _formattingBaseColors(resColors);
// 		const colorsPalette = splittingColors(colorsBase);
// 		return { colorsBase, colorsPalette };
// 	}
// )

const initialState = {
	theme: {},
	themes: [],
	base: {},
	palette: {}
}

const colorsSlice = createSlice({
	name: 'colors',
	initialState,
	reducers: {
		addTheme(state, action) {
			state.themes.push(action.payload);
		},
		remTheme(state, action) {
			state.themes = state.themes.filter(item => item.id != action.payload)
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchColorsBaseById.fulfilled, (state, action) => {
			state.base = action.payload.colorsBase;
			state.palette = action.payload.colorsPalette;
			state.theme = action.payload.theme;
		})
		builder.addCase(fetchUserData.fulfilled, (state, action) => {
			state.base = action.payload.colors.colorsBase;
			state.palette = action.payload.colors.colorsPalette;
			state.themes = action.payload.themes;
			state.theme = action.payload.theme;
		})
	}
})

export const { addTheme, remTheme } = colorsSlice.actions;
export default colorsSlice.reducer;