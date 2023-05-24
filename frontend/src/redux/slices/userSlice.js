import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../../services/api';
import { _formattingBaseColors } from '../../services/formatting';
import { splittingColors } from '../../services/splitColors';

const { getUserData } = api();

export const fetchUserData = createAsyncThunk(
    'user/data',
    async (thunkAPI) => {
        const data = await getUserData();
        const colorsBase = _formattingBaseColors(data.data.baseColors);
        const colorsPalette = splittingColors(colorsBase);
        console.log(99, data);
        return {
            ...data.data,
            colors: { colorsBase, colorsPalette }
        };
    }
)

const initialState = {
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
})

export const { setIsAuth } = userSlice.actions;
export default userSlice.reducer;
