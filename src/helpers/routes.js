import queryString from 'query-string';

export const loginUrl = '/login';
export const logoutUrl = '/logout';
export const walletUrl = '/wallet';

export const getWalletsUrl = () => '/';
export const getWalletUrl = id => `${walletUrl}/${id}`;
export const getLoginUrl = () => {
    const pathName = window.location.pathname;
    const {redirectTo} = queryString.parse(window.location.search);
    const to = encodeURIComponent(redirectTo || (pathName === loginUrl ? '/' : pathName));
    return `${loginUrl}?redirectTo=${to}`;
};
export const getLogoutUrl = () => logoutUrl;