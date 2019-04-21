const express = require('express');
const config = require('config');

const {getBitgo, errorHandler} = require('../../services/bitgo');

module.exports = function({logger}) {
    const router = new express.Router();
    router.get('/wallet', function(req, res) {
        const bitgo = getBitgo(req);

        bitgo.coin('tbtc').wallets().list({})
            .then(function(response) {
                res.json({
                    ...response
                });
            })
            .catch((e) => errorHandler(logger, res, e));
    });

    return router;
};
