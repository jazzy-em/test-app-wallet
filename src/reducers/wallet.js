import {SEND_COINS_STEPS} from '../constants/wallet';

const initialState = {
    wallets: [],
    wallet: null,
    sendMoneyStep: SEND_COINS_STEPS.initial
};

const walletReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'WALLET_SET_WALLETS':
            return {...state, wallets: action.payload};
        case 'WALLET_SET_WALLET':
            return {...state, wallet: action.payload};
        case 'WALLET_SET_SEND_MONEY_STEP':
            return {...state, sendMoneyStep: action.payload};
    }
    return state;
};

export default walletReducer;
