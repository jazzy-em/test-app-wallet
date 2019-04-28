const express = require('express');
const config = require('config');

const {callBitgo} = require('../../services/bitgo');

module.exports = function({logger}) {
    const router = new express.Router();
    router.get('/wallets', function(req, res) {
        callBitgo({
            action: bitgo => bitgo.coin('tbtc').wallets().list({}),
            logger,
            req,
            res
        });
    });

    return router;
};
