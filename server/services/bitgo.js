const BitGoJS = require('bitgo');
const {path} = require('ramda');

const getBitgo = req => {
    let accessToken;
    if (req) {
        const authHeader = path(['headers', 'authorization'], req);
        accessToken = authHeader && authHeader.split(' ')[1];
    }
    return new BitGoJS.BitGo({env: 'test', accessToken});
};

const callBitgo = ({method, action, logger, params, req, res, noToken}) => {
    const bitgo = getBitgo(noToken ? null : req);
    const promise = action ? action(bitgo) : bitgo[method](params);
    promise
        .then(function(response) {
            res.json({
                ...response
            });
        })
        .catch(e => errorHandler(logger, res, e));
};

const errorHandler = (logger, res, e) => {
    logger.error(e);
    res.status(e.status || 500);
    res.json(e);
};

module.exports = {
    callBitgo
};
