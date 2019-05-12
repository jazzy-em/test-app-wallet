import produce from 'immer';

import {SEND_COINS_STATES} from '../constants/wallet';
import {WALLET} from '../constants/actions';

const initialState = {
    wallets: [],
    wallet: null,
    transfers: null,
    sendMoneyStep: SEND_COINS_STATES.initial
};

const walletReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case WALLET.SET_WALLETS:
                draft.wallets = action.payload;
                break;
            case WALLET.SET_WALLET:
                draft.wallet = action.payload;
                break;
            case WALLET.CLEAR_WALLET:
                draft.wallet = null;
                break;
            case WALLET.SET_TRANSFERS:
                draft.transfers = action.payload;
                break;
            case WALLET.SET_SEND_MONEY_STEP:
                draft.sendMoneyStep = action.payload;
                break;
        }
    });

export default walletReducer;
