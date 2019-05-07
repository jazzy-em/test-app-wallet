import {fork, takeLatest, takeEvery, put, call, all, delay} from 'redux-saga/effects';

import * as api from '../api';
import {setAppLoading, showNotificationAction} from '../actions/ui';
import {setSendMoneyStepAction, setTransfersAction, setWalletAction, setWalletsAction} from '../actions/wallet';
import {SEND_COINS_STEPS} from '../constants/wallet';
import {handleErrors} from './common';


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
    try {
        const [walletResponse, transfersResponse] = yield all([
            call(api.wallet, walletId),
            call(api.transfers, walletId)
        ]);
        yield put(setWalletAction(walletResponse));
        const transfers = transfersResponse && transfersResponse.transfers;
        yield put(setTransfersAction(transfers));
    } catch (e) {
        yield call(handleErrors, e);
    }
}

export function* loadWallet(action) {
    yield put(setAppLoading(true));
    yield call(silentLoadWallet, action.payload);
    yield put(setAppLoading(false));
}

export function* walletPolling(action) {
    if (action.type === 'WALLET_CLEAR_WALLET') {
        // it will stop polling
        return;
    }
    while (true) {
        yield delay(10000);
        yield call(silentLoadWallet, action.payload.id);
    }
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

export function* walletPollingSaga() {
    yield takeLatest(['WALLET_SET_WALLET', 'WALLET_CLEAR_WALLET'], walletPolling);
}

export function* sendCoinsSaga() {
    yield takeEvery('WALLET_SEND_COINS_REQUEST', sendCoins);
}

const sagas = [
    fork(loadWalletsSaga),
    fork(loadWalletSaga),
    fork(sendCoinsSaga),
    fork(walletPollingSaga)
];
export default sagas;