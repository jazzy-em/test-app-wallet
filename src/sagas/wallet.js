import {fork, takeLatest, takeEvery, put, call} from 'redux-saga/effects';
import {delay} from 'redux-saga';

import * as api from '../api';
import {setAppLoading, showNotificationAction} from '../actions/ui';
import {setSendMoneyStepAction, setWalletAction, setWalletsAction} from '../actions/wallet';
import {SEND_COINS_STEPS} from '../constants/wallet';
import {handleErrors} from './common';


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

export function* sendCoins(action) {
    const {fromId, to, amount, passphrase, otp} = action.payload;
    yield put(setAppLoading(true));
    yield put(setSendMoneyStepAction(SEND_COINS_STEPS.inProgress));
    try {
        yield call(api.unlock, otp);
        yield call(api.sendCoins, {walletId: fromId, address: to, amount, walletPassphrase: passphrase});
        yield put(showNotificationAction({message: 'Money are successfully sent!'}));
        yield put(setSendMoneyStepAction(SEND_COINS_STEPS.success));
    } catch (e) {
        yield call(handleErrors, e);
    }
    yield put(setAppLoading(false));
    yield put(setSendMoneyStepAction(SEND_COINS_STEPS.initial));
}

export function* loadWalletsSaga() {
    yield takeLatest('WALLET_LOAD_WALLETS_REQUEST', loadWallets);
}

export function* loadWalletSaga() {
    yield takeLatest('WALLET_LOAD_WALLET_REQUEST', loadWallet);
}

export function* sendCoinsSaga() {
    yield takeEvery('WALLET_SEND_COINS_REQUEST', sendCoins);
}

const sagas = [
    fork(loadWalletsSaga),
    fork(loadWalletSaga),
    fork(sendCoinsSaga)
];
export default sagas;