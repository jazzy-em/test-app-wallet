import BigNumber from 'bignumber.js';
import moment from 'moment';

export const satoshiToBtc = satoshi => {
    const safeSatoshi = new BigNumber(satoshi);
    return safeSatoshi.dividedBy(1e8);
};
export const formatWalletBalance = wallet => `${satoshiToBtc(wallet.balance)} ${wallet.coin.toUpperCase()}`;

export const btcToSatoshi = btc => {
    const safeBtc = new BigNumber(btc.replace(',', '.'));
    return safeBtc.multipliedBy(1e8);
};

export const formatTransferAmount = baseValueString => {
    const btc = satoshiToBtc(baseValueString);
    return btc > 0 ? `+${btc}` : `${btc}`;
};

export const formatTimeForTransfers = date => moment(date).format('YYYY-MM-DD HH:mm:ss');
