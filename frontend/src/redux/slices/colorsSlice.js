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
		return { colorsBase, colorsPalette };
	}
)

const initialState = {
	base: {},
	palette: {}
}

const colorsSlice = createSlice({
	name: 'colors',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchColorsBaseById.fulfilled, (state, action) => {
			state.base = action.payload.colorsBase;
			state.palette = action.payload.colorsPalette;
		})
		builder.addCase(fetchUserData.fulfilled, (state, action) => {
			state.base = action.payload.colors.colorsBase;
			state.palette = action.payload.colors.colorsPalette;;
		})
	}
})

export const { } = colorsSlice.actions;
export default colorsSlice.reducer;
