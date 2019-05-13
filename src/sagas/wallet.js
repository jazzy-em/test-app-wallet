import {fork, takeLatest, takeEvery, put, call, all, delay} from 'redux-saga/effects';

import * as api from '../api';
import {setAppLoading, showNotificationAction} from '../actions/ui';
import {
    setSendMoneyStepAction,
    setTransfersAction,
    setWalletAction,
    setWalletsAction,
    startWalletPollingAction
} from '../actions/wallet';
import {SEND_COINS_STATES} from '../constants/wallet';
import {handleErrors} from './common';
import {WALLET} from '../constants/actions';

export const WALLET_POLLING_INTERVAL = 10000;

export function* loadWallets() {
    yield put(setAppLoading(true));
    try {
        const json = yield call(api.wallets) || {};
        const wallets = json.wallets;
        yield put(setWalletsAction(wallets));
    } catch (e) {
        yield call(handleErrors, e);
    }
    yield put(setAppLoading(false));
}

export function* silentLoadWallet(walletId) {
    let success = false;
    try {
        const [walletResponse, transfersResponse] = yield all([
            call(api.wallet, walletId),
            call(api.transfers, walletId)
        ]);
        yield put(setWalletAction(walletResponse));
        const transfers = transfersResponse && transfersResponse.transfers;
        yield put(setTransfersAction(transfers));
        success = true;
    } catch (e) {
        yield call(handleErrors, e);
    }
    return success;
}

export function* loadWallet(action) {
    yield put(setAppLoading(true));
    const success = yield call(silentLoadWallet, action.payload);
    yield put(setAppLoading(false));
    if (success) {
        yield put(startWalletPollingAction(action.payload));
    }
}

export function* walletPolling(action) {
    if (action.type === WALLET.CLEAR_WALLET) {
        // it will stop polling
        return;
    }
    while (true) {
        yield delay(WALLET_POLLING_INTERVAL);
        yield call(silentLoadWallet, action.payload);
    }
}

export function* sendCoins(action) {
    const {fromId, to, amount, passphrase, otp} = action.payload;
    yield put(setAppLoading(true));
    yield put(setSendMoneyStepAction(SEND_COINS_STATES.inProgress));
    try {
        yield call(api.unlock, otp);
        yield call(api.sendCoins, {walletId: fromId, address: to, amount, walletPassphrase: passphrase});
        yield put(showNotificationAction({message: 'Money was successfully sent!'}));
        yield put(setSendMoneyStepAction(SEND_COINS_STATES.success));
    } catch (e) {
        yield call(handleErrors, e);
    }
    yield put(setAppLoading(false));
    yield put(setSendMoneyStepAction(SEND_COINS_STATES.initial));
}

export function* loadWalletsSaga() {
    yield takeLatest(WALLET.LOAD_WALLETS_REQUEST, loadWallets);
}

export function* loadWalletSaga() {
    yield takeLatest(WALLET.LOAD_WALLET_REQUEST, loadWallet);
}

export function* walletPollingSaga() {
    yield takeLatest([WALLET.START_POLLING, WALLET.CLEAR_WALLET], walletPolling);
}

export function* sendCoinsSaga() {
    yield takeEvery(WALLET.SEND_COINS_REQUEST, sendCoins);
}

const sagas = [fork(loadWalletsSaga), fork(loadWalletSaga), fork(sendCoinsSaga), fork(walletPollingSaga)];
export default sagas;
