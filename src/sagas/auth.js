import {fork, takeLatest, select, put, call} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {push} from 'connected-react-router'
import {path, flatten} from 'ramda';

import * as api from '../api';
import {
    setAppLoading, showNotificationAction
} from '../actions/ui';
import {
    setAuthErrorsAction,
    setUserInfoAction
} from '../actions/auth';
import {setNetworkOptions} from "../utils/network";


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
            setNetworkOptions({accessToken});
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
    const commonPath = ['info', 'e', 'result'];
    const error = path([...commonPath, 'message'], e) || path([...commonPath, 'error'], e);
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


export function* loginSaga() {
    yield takeLatest('AUTH_LOGIN_REQUEST', login);
}

export function* logoutSaga() {
    yield takeLatest('AUTH_LOGOUT_REQUEST', logout);
}


const sagas = [
    fork(loginSaga),
    fork(logoutSaga)
];
export default sagas;