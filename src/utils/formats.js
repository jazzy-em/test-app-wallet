import BigNumber from 'bignumber.js';

export const satoshiToBtc = satoshi => {
    const safeSatoshi = new BigNumber(satoshi);
    return safeSatoshi.dividedBy(1e8);
};
export const formatWalletBalance = wallet => `${satoshiToBtc(wallet.balance)} ${wallet.coin.toUpperCase()}`;

export const btcToSatoshi = btc => {
    const safeBtc = new BigNumber(btc.replace(',', '.'));
    return safeBtc.multipliedBy(1e8);
};