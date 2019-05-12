import produce from 'immer';

import {AUTH} from '../constants/actions';

const initialState = {
    userInfo: null,
    authErrors: []
};

const authReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case AUTH.SET_USER_INFO:
                draft.userInfo = action.payload;
                break;
            case AUTH.SET_AUTH_ERRORS:
                draft.authErrors = action.payload;
                break;
        }
    });

export default authReducer;
