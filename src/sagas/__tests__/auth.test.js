import {takeLatest, put, call} from 'redux-saga/effects';
import {push} from 'connected-react-router';

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
import {handleErrors} from '../common';

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

    const error = {
        info: {
            result: {
                message: 'Some error!'
            }
        }
    };

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
            expect(gen.next().value).toEqual(
                call(api.login, action.payload.login, action.payload.password, action.payload.otp)
            );
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
            expect(gen.next().value).toEqual(
                call(api.login, action.payload.login, action.payload.password, action.payload.otp)
            );
            const response = {
                user: {email: 'user@email.com'}
            };
            expect(gen.next(response).value).toEqual(put(setAuthErrorsAction(['Incorrect login response'])));
            expect(localStorage.getItem(accessTokenKey)).toBeFalsy();
            expect(gen.next().value).toEqual(put(setAppLoading(false)));
            expect(gen.next().done).toBe(true);
        });

        it('should call handleAuthErrors if login request is failed', () => {
            const gen = login(action);
            expect(localStorage.getItem(accessTokenKey)).toBeFalsy();
            expect(gen.next().value).toEqual(put(setAppLoading(true)));
            expect(gen.next().value).toEqual(
                call(api.login, action.payload.login, action.payload.password, action.payload.otp)
            );
            expect(gen.throw(error).value).toEqual(call(handleAuthErrors, error));
            expect(localStorage.getItem(accessTokenKey)).toBeFalsy();
            expect(gen.next().value).toEqual(put(setAppLoading(false)));
            expect(gen.next().done).toBe(true);
        });
    });

    describe('Logout saga behavior', () => {
        it('should clear user info if logout request is successful', () => {
            const gen = logout();
            expect(gen.next().value).toEqual(put(setAppLoading(true)));
            expect(gen.next().value).toEqual(call(api.logout));
            expect(gen.next().value).toEqual(put(setUserInfoAction(null)));
            expect(gen.next().value).toEqual(put(setAppLoading(false)));
            expect(gen.next().done).toBe(true);
        });

        it('should set auth errors if login request is failed', () => {
            const gen = logout();
            expect(gen.next().value).toEqual(put(setAppLoading(true)));
            expect(gen.next().value).toEqual(call(api.logout));
            const error = {};
            expect(gen.throw(error).value).toEqual(put(setAuthErrorsAction(['Something went wrong...'])));
            expect(gen.next().value).toEqual(put(setAppLoading(false)));
            expect(gen.next().done).toBe(true);
        });
    });

    describe('FetchUserInfo saga behavior', () => {
        it('should set user info if api.me request is successful', () => {
            const gen = fetchUserInfo();
            expect(gen.next().value).toEqual(call(api.me));
            const response = {
                user: {email: 'user@email.com'}
            };
            expect(gen.next(response).value).toEqual(put(setUserInfoAction(response)));
            expect(gen.next().done).toBe(true);
        });

        it('should call handleErrors if api.me request is failed', () => {
            const gen = fetchUserInfo();
            expect(gen.next().value).toEqual(call(api.me));
            expect(gen.throw(error).value).toEqual(call(handleErrors, error));
            expect(gen.next().done).toBe(true);
        });
    });

    describe('onSuccessfulLogin behavior', () => {
        it('should reset auth errors and push redirectTo url', () => {
            const redirectTo = '/123';
            const gen = onSuccessfulLogin(redirectTo);
            expect(gen.next().value).toEqual(put(setAuthErrorsAction([])));
            expect(gen.next().value).toEqual(put(push(redirectTo)));
            expect(gen.next().done).toBe(true);
        });

        it('should redirect to "/" by default', () => {
            const gen = onSuccessfulLogin();
            expect(gen.next().value).toEqual(put(setAuthErrorsAction([])));
            expect(gen.next().value).toEqual(put(push('/')));
            expect(gen.next().done).toBe(true);
        });
    });

    describe('handleAuthErrors behavior', () => {
        it('should get error from message prop', () => {
            const error = {
                info: {
                    result: {
                        message: 'Some error!'
                    }
                }
            };
            const gen = handleAuthErrors(error);
            expect(gen.next().value).toEqual(put(setAuthErrorsAction(['Some error!'])));
            expect(gen.next().done).toBe(true);
        });

        it('should get error from error prop', () => {
            const error = {
                info: {
                    result: {
                        error: 'Some error!'
                    }
                }
            };
            const gen = handleAuthErrors(error);
            expect(gen.next().value).toEqual(put(setAuthErrorsAction(['Some error!'])));
            expect(gen.next().done).toBe(true);
        });

        it('should set custom error in case of needsOTP flag', () => {
            const error = {
                info: {
                    result: {
                        needsOTP: true,
                        error: 'Some error!'
                    }
                }
            };
            const gen = handleAuthErrors(error);
            expect(gen.next().value).toEqual(put(setAuthErrorsAction(['OTP code is incorrect'])));
            expect(gen.next().done).toBe(true);
        });
    });
});
