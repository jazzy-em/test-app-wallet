import {jsonPostRequest, jsonRequest} from '../utils/network';

// auth
export const login = (login, password, otp) => {
    const body = {
        username: login,
        password,
        otp
    };

    return jsonPostRequest('/api/login', body);
};
export const me = () => jsonRequest('/api/me');

export const logout = () => jsonRequest('/api/logout');

export const unlock = otp => {
    const body = {
        otp
    };

    return jsonPostRequest('/api/unlock', body);
};

// wallets
export const wallets = () => jsonRequest('/api/wallets');
export const wallet = id => jsonRequest(`/api/wallet/${id}`);
export const transfers = (id, limit = 20) => jsonRequest(`/api/wallet/${id}/transfers?limit=${limit}`);

export const sendCoins = ({walletId, address, amount, walletPassphrase}) => {
    const body = {
        address,
        amount,
        walletPassphrase
    };

    return jsonPostRequest(`/api/wallet/${walletId}/sendCoins`, body);
};
