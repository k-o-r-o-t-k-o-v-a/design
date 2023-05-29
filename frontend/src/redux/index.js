import { configureStore } from "@reduxjs/toolkit";

import colorsSlice from './slices/colorsSlice';
import userSlice from './slices/userSlice';
import workspacesSlice from './slices/workspacesSlice';
import boardsSlice from './slices/boardsSlice';
import membersSlice from './slices/membersSlice';
import notificationsSlice from './slices/notificationsSlice'
import calendarSlice from './slices/calendarSlice';

const store = configureStore({
	reducer: {
		colorsSlice,
		userSlice,
		workspacesSlice,
		boardsSlice,
		membersSlice,
		notificationsSlice,
		calendarSlice,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware(),
	devTools: process.env.NODE_ENV !== 'production',
})

export default store;
