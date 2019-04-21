import {fork, takeLatest, select, put, call} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {push} from 'connected-react-router'
import {path} from 'ramda';

import * as api from '../api';
import {setAppLoading, showNotificationAction} from '../actions/ui';
import {setAuthErrorsAction, setUserInfoAction} from '../actions/auth';
import {setAccessToken} from '../helpers/auth';


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

export const mapErrorToAction = (e, mapping) => {
    return e.response ? mapping[e.response.status] || mapping.defaultWithStatus || mapping.default
        :
        mapping.default;
};

export function* fetchUserInfo() {
    try {
        const userInfo = yield call(api.me);
        console.log(userInfo);
        yield put(setUserInfoAction(userInfo));
    } catch (e) {
        console.log(e);
        const action = mapErrorToAction(e, {
            //default: () => showNotificationAction({type: 'error'})
        });
        //yield put(action(e));
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