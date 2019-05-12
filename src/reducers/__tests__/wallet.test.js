import walletReducer from '../wallet';

describe('Wallet reducer tests', () => {
    it('should have initial state', () => {
        const initialState = {
            wallets: [],
            wallet: null,
            transfers: null,
            sendMoneyStep: 'initial'
        };

        expect(walletReducer(undefined, {})).toEqual(initialState);
    });

    it('should set wallets', () => {
        const state = {
            wallets: []
        };

        const payload = [{id: 1, coin: 'B', balance: 0.002}];

        expect(walletReducer(state, {type: 'WALLET_SET_WALLETS', payload})).toEqual({
            wallets: payload
        });
    });

    it('should set wallet', () => {
        const state = {
            wallet: null
        };

        const payload = {id: 1, coin: 'B', balance: 0.002};

        expect(walletReducer(state, {type: 'WALLET_SET_WALLET', payload})).toEqual({
            wallet: payload
        });
    });

    it('should clear wallet', () => {
        const state = {
            wallet: {id: 1, coin: 'B', balance: 0.002}
        };

        expect(walletReducer(state, {type: 'WALLET_CLEAR_WALLET'})).toEqual({
            wallet: null
        });
    });

    it('should set transfers', () => {
        const state = {
            transfers: null
        };

        const payload = [{date: new Date(), type: 'send', amount: 1}];

        expect(walletReducer(state, {type: 'WALLET_SET_TRANSFERS', payload})).toEqual({
            transfers: payload
        });
    });

    it('should set send money step', () => {
        const state = {
            sendMoneyStep: 'initial'
        };

        const payload = 'inProgress';

        expect(walletReducer(state, {type: 'WALLET_SET_SEND_MONEY_STEP', payload})).toEqual({
            sendMoneyStep: payload
        });
    });
});
