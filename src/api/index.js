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

// wallets
export const wallets = () => jsonRequest('/api/wallets');