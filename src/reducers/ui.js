const initialState = {
    loading: false,
};

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UI_SET_APP_LOADING':
            return {...state, loading: action.payload};
    }
    return state;
};

export default uiReducer;
