import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';

const Theme = ({ children }) => {
	const { palette } = useSelector(state => state.colorsSlice);

	return (
		<ThemeProvider theme={{ colors: { ...palette } }}>
			{children}
		</ThemeProvider>
	);
};

export default Theme;