const DEFAULT_HEADERS = {
    'Cache-Control': 'no-cache',
    'pragma': 'no-cache'
};

const DEFAULT_OPTIONS = {
    credentials: 'same-origin',
    pragma: 'no-cache',
    'cache-control': 'no-cache',
    headers: DEFAULT_HEADERS
};

let handler401 = () => {};
let accessToken;

const getAuthHeader = () => ({
    Authorization: `Bearer ${accessToken}`
});

export const setNetworkOptions = options => {
    const opt = options || {};
    if (opt.handler401) {
        handler401 = opt.handler401;
    }
    if (opt.accessToken) {
        accessToken = opt.accessToken;
    }
};

const handleErrors = (response) => {
    if (!response.ok) {
        const body = response.text();
        return body.then(message => {
            let info;
            try {
                info = {...JSON.parse(message)};
            } catch (e) {
                info = {error: message, original: e};
            }
            throw {info, response};
        });
    }
    return response;
};

const parseErrors = (error) => {
    const {response} = error;
    switch (response.status) {
        case 401:
            handler401();
            break;
        default:
            throw error;
    }
};

export const request = (url, options) => {
    const opt = {...DEFAULT_OPTIONS, ...options};
    opt.headers = {...DEFAULT_HEADERS, ...getAuthHeader(), ...opt.headers};
    return fetch(url, opt)
        .then(handleErrors)
        .catch(parseErrors);
};

export const jsonRequest = (url, options) => request(url, options).then(res => res.json());
export const textRequest = (url, options) => request(url, options).then(res => res.text());