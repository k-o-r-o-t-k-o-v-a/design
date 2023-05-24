import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux';

import App from './app/App';

import Theme from './styles/Theme';
import GlobalStyle from './styles/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Theme>
            <GlobalStyle />
            <Router>
                <App />
            </Router>
        </Theme>
    </Provider>
);
