import { configureStore } from "@reduxjs/toolkit";

import colorsSlice from './slices/colorsSlice';
import userSlice from './slices/userSlice';
import workspacesSlice from './slices/workspacesSlice';
import boardsSlice from './slices/boardsSlice';

const store = configureStore({
    reducer: {
        colorsSlice,
        userSlice,
        workspacesSlice,
        boardsSlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;
