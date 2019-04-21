import {jsonRequest} from '../utils/network';

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
export const logout = () => {};