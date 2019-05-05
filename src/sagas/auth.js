import {fork, takeLatest, put, call} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {push} from 'connected-react-router'
import {path} from 'ramda';

import * as api from '../api';
import {setAppLoading} from '../actions/ui';
import {setAuthErrorsAction, setUserInfoAction} from '../actions/auth';
import {setAccessToken} from '../helpers/auth';
import {handleErrors} from './common';


export function* onSuccessfulLogin(redirectTo) {
    yield put(setAuthErrorsAction([]));
    yield put(push(redirectTo || '/'));
}

export function* login(action) {
    const {login, password, otp, redirectTo} = action.payload;
    yield put(setAppLoading(true));
    try {
        const json = yield call(api.login, login, password, otp) || {};
        const userInfo = json.user;
        const accessToken = json['access_token'];
        if (userInfo && accessToken) {
            setAccessToken(accessToken);
            yield put(setUserInfoAction(userInfo));
            yield call(onSuccessfulLogin, redirectTo);
        } else {
            yield put(setAuthErrorsAction(['Incorrect login response']));
        }
    } catch (e) {
        yield call(handleAuthErrors, e);
    }
    yield put(setAppLoading(false));
}

export function* handleAuthErrors(e) {
    const commonPath = ['info', 'result'];
    const needsOtp = path([...commonPath, 'needsOTP'], e);
    const error = needsOtp ?
        'OTP code is incorrect'
        :
        path([...commonPath, 'message'], e) || path([...commonPath, 'error'], e);
    yield put(setAuthErrorsAction(error ? [error] : ['Something went wrong...']));
}

export function* logout() {
    yield put(setAppLoading(true));
    try {
        yield call(api.logout);
        yield put(setUserInfoAction(null));
    } catch (e) {
        yield put(setAuthErrorsAction(['Something went wrong...']));
    }
    yield put(setAppLoading(false));
}

export function* fetchUserInfo() {
    try {
        const userInfo = yield call(api.me);
        yield put(setUserInfoAction(userInfo));
    } catch (e) {
        yield call(handleErrors, e);
    }
}

export function* loginSaga() {
    yield takeLatest('AUTH_LOGIN_REQUEST', login);
}

export function* logoutSaga() {
    yield takeLatest('AUTH_LOGOUT_REQUEST', logout);
}

export function* fetchUserInfoSaga() {
    yield takeLatest('AUTH_FETCH_USER_INFO_REQUEST', fetchUserInfo);
}


const sagas = [
    fork(loginSaga),
    fork(logoutSaga),
    fork(fetchUserInfoSaga)
];
export default sagas;