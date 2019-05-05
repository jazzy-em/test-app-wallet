import {path} from 'ramda';
import {put} from '../../node_modules/redux-saga/effects';
import {showNotificationAction} from '../actions/ui';

export function* handleErrors(e) {
    const commonPath = ['info', 'result'];
    const error = path([...commonPath, 'message'], e) || path([...commonPath, 'error'], e) || path(['info', 'message'], e);
    yield put(showNotificationAction({type: 'error', message: error || 'Something went wrong...'}));
}