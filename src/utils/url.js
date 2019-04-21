import queryString from 'query-string';

export const stringifySearchPart = urlSearchObj => {
    const search = queryString.stringify(urlSearchObj, {strict: false});
    return search ? `?${search}` : '';
};