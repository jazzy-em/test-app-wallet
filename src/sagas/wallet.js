import {fork, takeLatest, select, put, call} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {push} from 'connected-react-router'
import {path} from 'ramda';

import * as api from '../api';
import {setAppLoading, showNotificationAction} from '../actions/ui';
import {setWalletAction, setWalletsAction} from '../actions/wallet';


export function* loadWallets() {
    yield put(setAppLoading(true));
    try {
        const json = yield call(api.wallets) || {};
        const wallets = json.wallets && json.wallets.map(wallet => wallet['_wallet']);
        yield put(setWalletsAction(wallets));
    } catch (e) {
        yield call(handleErrors, e);
    }
    yield put(setAppLoading(false));
}

export function* loadWallet(action) {
    yield put(setAppLoading(true));
    try {
        const walletId = action.payload;
        const json = yield call(api.wallet, walletId);
        const wallet = json && json['_wallet'];
        yield put(setWalletAction(wallet));
    } catch (e) {
        yield call(handleErrors, e);
    }
    yield put(setAppLoading(false));
}

export function* handleErrors(e) {
    const commonPath = ['info', 'result'];
    const error = path([...commonPath, 'message'], e) || path([...commonPath, 'error'], e);
    yield put(showNotificationAction({type: 'error', message: error || 'Something went wrong...'}));
}

export function* loadWalletsSaga() {
    yield takeLatest('WALLET_LOAD_WALLETS_REQUEST', loadWallets);
}

export function* loadWalletSaga() {
    yield takeLatest('WALLET_LOAD_WALLET_REQUEST', loadWallet);
}

const sagas = [
    fork(loadWalletsSaga),
    fork(loadWalletSaga)
];
export default sagas;