import {jsonRequest} from '../utils/network';

// auth
export const login = (login, password, otp) => {
    const body = {
        username: login,
        password,
        otp
    };

    return jsonRequest(`/api/login`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
export const me = () => jsonRequest('/api/me');

export const logout = () => jsonRequest('/api/logout');

export const unlock = (otp) => {
    const body = {
        otp
    };

    return jsonRequest(`/api/unlock`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

// wallets
export const wallets = () => jsonRequest('/api/wallets');
export const wallet = id => jsonRequest(`/api/wallet/${id}`);

export const sendCoins = ({walletId, address, amount, walletPassphrase}) => {
    const body = {
        address,
        amount,
        walletPassphrase
    };

    return jsonRequest(`/api/wallet/${walletId}/sendCoins`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
};