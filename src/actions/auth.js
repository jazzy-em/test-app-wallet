export const loginRequestAction = ({login, password, otp, redirectTo}) => ({
    type: 'AUTH_LOGIN_REQUEST',
    payload: {login, password, otp, redirectTo}
});

export const logoutRequestAction = () => ({
    type: 'AUTH_LOGOUT_REQUEST'
});

export const setUserInfoAction = userinfo => ({
    type: 'AUTH_SET_USER_INFO',
    payload: userinfo
});

export const setAuthErrorsAction = errors => ({
    type: 'AUTH_SET_AUTH_ERRORS',
    payload: errors
});

export const fetchUserInfoRequestAction = () => ({
    type: 'AUTH_FETCH_USER_INFO_REQUEST'
});
