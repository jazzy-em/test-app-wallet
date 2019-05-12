import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import auth from './auth';
import ui from './ui';
import wallet from './wallet';

const reducer = {
    auth,
    ui,
    wallet
};

export default history =>
    combineReducers({
        router: connectRouter(history),
        ...reducer
    });
