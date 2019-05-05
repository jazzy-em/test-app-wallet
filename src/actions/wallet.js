export const loadWalletsRequestAction = () => ({
    type: 'WALLET_LOAD_WALLETS_REQUEST'
});

export const setWalletsAction = wallets => ({
    type: 'WALLET_SET_WALLETS',
    payload: wallets
});

export const loadWalletRequestAction = id => ({
    type: 'WALLET_LOAD_WALLET_REQUEST',
    payload: id
});

export const setWalletAction = wallet => ({
    type: 'WALLET_SET_WALLET',
    payload: wallet
});

export const clearWalletAction = () => setWalletAction(null);

export const sendCoinsRequestAction = (transactionInfo) => ({
    type: 'WALLET_SEND_COINS_REQUEST',
    payload: transactionInfo
});

export const setSendMoneyStepAction = step => ({
    type: 'WALLET_SET_SEND_MONEY_STEP',
    payload: step
});