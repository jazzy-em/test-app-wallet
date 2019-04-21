import {accessTokenKey} from '../constants/auth';
import {setNetworkOptions} from '../utils/network';

export const isLoggedIn = userInfo => !!userInfo;

export const setAccessToken = accessToken => {
    localStorage.setItem(accessTokenKey, accessToken);
    setNetworkOptions({accessToken});
};

export const getAccessToken = () => {
    const accessToken = localStorage.getItem(accessTokenKey);
    accessToken && setNetworkOptions({accessToken});
    return accessToken;
};