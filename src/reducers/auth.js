import {AUTH} from '../constants/actions';

const initialState = {
    userInfo: null,
    authErrors: []
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH.SET_USER_INFO:
            return {...state, userInfo: action.payload};
        case AUTH.SET_AUTH_ERRORS:
            return {...state, authErrors: action.payload};
    }
    return state;
};

export default authReducer;
