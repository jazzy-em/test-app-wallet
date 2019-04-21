const initialState = {
    userInfo: null,
    authErrors: [],
    authMessages: []
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_SET_USER_INFO':
            return {...state, userInfo: action.payload};
        case 'AUTH_SET_AUTH_ERRORS':
            return {...state, authErrors: action.payload};
    }
    return state;
};

export default authReducer;
