import {SEND_COINS_STEPS} from '../constants/wallet';
import {WALLET} from '../constants/actions';

const initialState = {
    wallets: [],
    wallet: null,
    transfers: null,
    sendMoneyStep: SEND_COINS_STEPS.initial
};

const walletReducer = (state = initialState, action) => {
    switch (action.type) {
        case WALLET.SET_WALLETS:
            return {...state, wallets: action.payload};
        case WALLET.SET_WALLET:
            return {...state, wallet: action.payload};
        case WALLET.CLEAR_WALLET:
            return {...state, wallet: null};
        case WALLET.SET_TRANSFERS:
            return {...state, transfers: action.payload};
        case WALLET.SET_SEND_MONEY_STEP:
            return {...state, sendMoneyStep: action.payload};
    }
    return state;
};

export default walletReducer;
