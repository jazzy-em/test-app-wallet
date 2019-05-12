export const storageMock = () => {
    let storage = {};
    const rebuild = () => Object.assign(api, storage, methods, {length: Object.keys(storage).length});
    const methods = {
        getItem: name => storage[name],
        setItem: (name, value) => {
            storage[name] = value;
            rebuild();
        },
        removeItem: name => {
            delete storage[name];
            delete api[name];
            rebuild();
        },
        clear: () => {
            Object.keys(storage).forEach(key => delete api[key]);
            storage = {};
            rebuild();
        }
    };
    const api = {...methods};
    return api;
};

export const URL_PREFIX = 'testapp';
export const getUrlPrefix = () => (URL_PREFIX ? `/${URL_PREFIX}` : '');
