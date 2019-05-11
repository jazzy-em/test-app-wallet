import {takeLatest, put, call} from 'redux-saga/effects';

import {
    fetchUserInfo,
    fetchUserInfoSaga,
    handleAuthErrors,
    login,
    loginSaga,
    logout,
    logoutSaga,
    onSuccessfulLogin
} from '../auth';
import {setAppLoading} from '../../actions/ui';
import * as api from '../../api';
import {accessTokenKey} from '../../constants/auth';
import {setAuthErrorsAction, setUserInfoAction} from '../../actions/auth';

describe('Auth sagas tests', () => {
    describe('Reactions on events', () => {
        it('should take latest AUTH_LOGIN_REQUEST action and run login saga', () => {
            const gen = loginSaga();
            expect(gen.next().value).toEqual(takeLatest('AUTH_LOGIN_REQUEST', login));
            expect(gen.next().done).toBe(true);
        });

        it('should take latest AUTH_LOGOUT_REQUEST action and run logout saga', () => {
            const gen = logoutSaga();
            expect(gen.next().value).toEqual(takeLatest('AUTH_LOGOUT_REQUEST', logout));
            expect(gen.next().done).toBe(true);
        });

        it('should take latest AUTH_FETCH_USER_INFO_REQUEST action and run fetchUserInfo saga', () => {
            const gen = fetchUserInfoSaga();
            expect(gen.next().value).toEqual(takeLatest('AUTH_FETCH_USER_INFO_REQUEST', fetchUserInfo));
            expect(gen.next().done).toBe(true);
        });
    });

    describe('Login saga behavior', () => {
        const action = {
            payload: {
                login: 'user@email.com',
                password: 'password',
                otp: '123456',
                redirectTo: '/123'
            }
        };

        beforeEach(() => {
            localStorage.clear();
        });

        it('should set access token and user info if login request is successful', () => {
            const gen = login(action);
            expect(localStorage.getItem(accessTokenKey)).toBeFalsy();
            expect(gen.next().value).toEqual(put(setAppLoading(true)));
            expect(gen.next().value).toEqual(call(api.login, action.payload.login, action.payload.password, action.payload.otp));
            const response = {
                user: {email: 'user@email.com'},
                access_token: 'fdGFWTfashghgfd'
            };
            expect(gen.next(response).value).toEqual(put(setUserInfoAction(response.user)));
            expect(localStorage.getItem(accessTokenKey)).toBe(response.access_token);
            expect(gen.next().value).toEqual(call(onSuccessfulLogin, action.payload.redirectTo));
            expect(gen.next().value).toEqual(put(setAppLoading(false)));
            expect(gen.next().done).toBe(true);
        });

        it('should set auth error if login response is not valid', () => {
            const gen = login(action);
            expect(localStorage.getItem(accessTokenKey)).toBeFalsy();
            expect(gen.next().value).toEqual(put(setAppLoading(true)));
            expect(gen.next().value).toEqual(call(api.login, action.payload.login, action.payload.password, action.payload.otp));
            const response = {
                user: {email: 'user@email.com'}
            };
            expect(gen.next(response).value).toEqual(put(setAuthErrorsAction(['Incorrect login response'])));
            expect(localStorage.getItem(accessTokenKey)).toBeFalsy();
            expect(gen.next().value).toEqual(put(setAppLoading(false)));
            expect(gen.next().done).toBe(true);
        });

        it('should parse and set auth errors if login request is falied', () => {
            const gen = login(action);
            expect(localStorage.getItem(accessTokenKey)).toBeFalsy();
            expect(gen.next().value).toEqual(put(setAppLoading(true)));
            expect(gen.next().value).toEqual(call(api.login, action.payload.login, action.payload.password, action.payload.otp));
            const error = {
                info: {
                    result: {
                        message: 'Some error!'
                    }
                }
            };
            expect(gen.throw(error).value).toEqual(call(handleAuthErrors, error));
            expect(localStorage.getItem(accessTokenKey)).toBeFalsy();
            expect(gen.next().value).toEqual(put(setAppLoading(false)));
            expect(gen.next().done).toBe(true);
        });
    });
});
