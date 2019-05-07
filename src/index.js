import '@babel/polyfill';
import 'whatwg-fetch';
import 'normalize.css';
import React from 'react';
import {render} from 'react-dom';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import {MuiThemeProvider} from '@material-ui/core/styles';
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router';
import {ConnectedRouter} from 'connected-react-router'

import App from './App';
import {theme} from './theme';
import createRootReducer from './reducers';
import saga from './sagas';
import {setNetworkOptions} from './utils/network';
import {getLoginUrl} from './helpers/routes';
import {fetchUserInfoRequestAction} from './actions/auth';

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const middlewares = [routerMiddleware(history), sagaMiddleware];

const store = createStore(
    createRootReducer(history),
    compose(
        applyMiddleware(...middlewares),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

sagaMiddleware.run(saga);
setNetworkOptions({
    handler401: () => {
        history.push(getLoginUrl());
    }
});
store.dispatch(fetchUserInfoRequestAction());

render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App/>
            </ConnectedRouter>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('application-root')
);

module.hot.accept();
