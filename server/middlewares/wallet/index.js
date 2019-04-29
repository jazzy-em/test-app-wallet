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

    router.get('/wallet/:walletId', function(req, res) {
        callBitgo({
            action: bitgo => bitgo.coin('tbtc').wallets()
                .get({id: req.params.walletId}),
            logger,
            req,
            res
        });
    });

    router.post('/wallet/:walletId/sendCoins', function(req, res) {
        const {address, amount, walletPassphrase} = req.body;
        callBitgo({
            action: bitgo => bitgo.coin('tbtc').wallets()
                    .get({id: req.params.walletId})
                    .then(wallet => wallet.send({address, amount, walletPassphrase})),
            logger,
            req,
            res
        });
    });

    return router;
};
