const BitGoJS = require('bitgo');
const {path} = require('ramda');

const getBitgo = (req) => {
    let accessToken;
    if (req) {
        const authHeader = path(['headers', 'authorization'], req);
        accessToken = authHeader && authHeader.split(' ')[1];
    }
    return new BitGoJS.BitGo({env: 'test', accessToken});
};

const errorHandler = (logger, res, e) => {
    logger.error(e);
    res.status(e.status || 500);
    res.json(e);
};

module.exports = {
    getBitgo,
    errorHandler
};