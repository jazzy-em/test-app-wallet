import {WALLET} from '../constants/actions';

export const loadWalletsRequestAction = () => ({
    type: WALLET.LOAD_WALLETS_REQUEST
});

export const setWalletsAction = wallets => ({
    type: WALLET.SET_WALLETS,
    payload: wallets
});

export const loadWalletRequestAction = id => ({
    type: WALLET.LOAD_WALLET_REQUEST,
    payload: id
});

export const startWalletPollingAction = id => ({
    type: WALLET.START_POLLING,
    payload: id
});

export const setWalletAction = wallet => ({
    type: WALLET.SET_WALLET,
    payload: wallet
});

export const clearWalletAction = () => ({
    type: WALLET.CLEAR_WALLET
});

export const sendCoinsRequestAction = transactionInfo => ({
    type: WALLET.SEND_COINS_REQUEST,
    payload: transactionInfo
});

export const setSendMoneyStepAction = step => ({
    type: WALLET.SET_SEND_MONEY_STEP,
    payload: step
});

export const setTransfersAction = transfers => ({
    type: WALLET.SET_TRANSFERS,
    payload: transfers
});
