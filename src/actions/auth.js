import {AUTH} from '../constants/actions';

export const loginRequestAction = ({login, password, otp, redirectTo}) => ({
    type: AUTH.LOGIN_REQUEST,
    payload: {login, password, otp, redirectTo}
});

export const logoutRequestAction = () => ({
    type: AUTH.LOGOUT_REQUEST
});

export const setUserInfoAction = userinfo => ({
    type: AUTH.SET_USER_INFO,
    payload: userinfo
});

export const setAuthErrorsAction = errors => ({
    type: AUTH.SET_AUTH_ERRORS,
    payload: errors
});

export const fetchUserInfoRequestAction = () => ({
    type: AUTH.FETCH_USER_INFO_REQUEST
});
