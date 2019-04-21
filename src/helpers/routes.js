import queryString from 'query-string';
import {stringifySearchPart} from '../utils/url';

export const loginUrl = '/login';
export const logoutUrl = '/logout';
export const walletUrl = '/wallet';

export const getWalletUrl = id => `${walletUrl}/${id}`;
export const getLoginUrl = () => {
    const pathName = window.location.pathname;
    const redirectTo = encodeURIComponent(pathName === loginUrl ? '/' : pathName);
    return `${loginUrl}?redirectTo=${redirectTo}`;
};
export const getLogoutUrl = () => logoutUrl;