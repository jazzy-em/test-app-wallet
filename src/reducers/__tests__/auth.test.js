import authReducer from '../auth';

describe('Auth reducer tests', () => {
    it('should have initial state', () => {
        const initialState = {
            userInfo: null,
            authErrors: []
        };

        expect(authReducer(undefined, {})).toEqual(initialState);
    });

    it('should set user info on login', () => {
        const state = {
            userInfo: null
        };

        expect(authReducer(state, {type: 'AUTH_SET_USER_INFO', payload: 'user'})).toEqual({
            userInfo: 'user'
        });
    });

    it('should set errors on auth errors event', () => {
        const payload = ['You are not authenticated'];

        expect(authReducer({}, {type: 'AUTH_SET_AUTH_ERRORS', payload})).toEqual({
            authErrors: payload
        });
    });
});
