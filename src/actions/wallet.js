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