import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import auth from './auth';
import ui from './ui';

const reducer = {
    auth,
    ui
};

export default (history) => combineReducers({
    router: connectRouter(history),
    ...reducer
});
