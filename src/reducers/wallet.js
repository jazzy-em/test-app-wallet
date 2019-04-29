const initialState = {
    wallets: [],
    wallet: null
};

const walletReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'WALLET_SET_WALLETS':
            return {...state, wallets: action.payload};
        case 'WALLET_SET_WALLET':
            return {...state, wallet: action.payload};
    }
    return state;
};

export default walletReducer;
