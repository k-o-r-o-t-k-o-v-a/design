import React from 'react';
import { Provider } from 'react-redux';
import store from '../src/redux';
import { fetchColorsBaseById } from '../src/redux/slices/colorsSlice';
import { BrowserRouter as Router } from 'react-router-dom';

import Theme from '../src/styles/Theme';
import GlobalStyle from '../src/styles/GlobalStyle';

export const decorators = [
	(Story) => (
		<Provider store={store}>
			<Theme>
				<GlobalStyle />
				<Router>
					<Story />
				</Router>
			</Theme>
		</Provider>
	),
];

store.dispatch(fetchColorsBaseById(1));

/** @type { import('@storybook/react').Preview } */
const preview = {
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
};

export default preview;
