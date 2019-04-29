const express = require('express');
const {callBitgo} = require('../../services/bitgo');

module.exports = ({logger}) => {
    const router = new express.Router();

    router.post('/login', function(req, res) {
        const {username, password, otp} = req.body;
        callBitgo({
            method: 'authenticate',
            params: {username, password, otp},
            req,
            res,
            logger,
            noToken: true
        });
    });

    router.get('/logout', function(req, res) {
        callBitgo({
            method: 'logout',
            req,
            res,
            logger
        });
    });

    router.get('/me', function(req, res) {
        callBitgo({
            method: 'me',
            req,
            res,
            logger
        });
    });

    router.post('/unlock', function(req, res) {
        const {otp} = req.body;
        callBitgo({
            action: bitgo => bitgo.unlock({otp}),
            req,
            res,
            logger
        });
    });

    return router;
};
