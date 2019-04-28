import {fork, takeLatest, select, put, call} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {push} from 'connected-react-router'
import {path} from 'ramda';

import * as api from '../api';
import {setAppLoading, showNotificationAction} from '../actions/ui';


export function* loadWallets() {
    yield put(setAppLoading(true));
    try {
        const json = yield call(api.wallets) || {};
        console.log(json);
    } catch (e) {
        yield call(handleErrors, e);
    }
    yield put(setAppLoading(false));
}

export function* handleErrors(e) {
    const commonPath = ['info', 'result'];
    const error = path([...commonPath, 'message'], e) || path([...commonPath, 'error'], e);
    yield put(showNotificationAction(error || 'Something went wrong...'));
}

export function* loadWalletsSaga() {
    yield takeLatest('WALLET_LOAD_WALLETS_REQUEST', loadWallets);
}


const sagas = [
    fork(loadWalletsSaga)
];
export default sagas;