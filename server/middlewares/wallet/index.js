const express = require('express');
const {callBitgo} = require('../../services/bitgo');

const walletToJson = wallet => wallet['_wallet'];

module.exports = function({logger}) {
    const router = new express.Router();
    router.get('/wallets', function(req, res) {
        callBitgo({
            action: bitgo => bitgo.coin('tbtc').wallets().list({})
                .then(item => ({...item, wallets: item.wallets.map(walletToJson)})),
            logger,
            req,
            res
        });
    });

    router.get('/wallet/:walletId', function(req, res) {
        callBitgo({
            action: bitgo => bitgo.coin('tbtc').wallets()
                .get({id: req.params.walletId})
                .then(walletToJson),
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

    router.get('/wallet/:walletId/transfers', function(req, res) {
        callBitgo({
            action: bitgo => bitgo.coin('tbtc').wallets()
                .get({id: req.params.walletId})
                .then(wallet => wallet.transfers({limit: +req.query.limit})),
            logger,
            req,
            res
        });
    });

    return router;
};
