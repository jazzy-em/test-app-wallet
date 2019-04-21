const express = require('express');
const {callBitgo} = require('../../services/bitgo');

module.exports = ({logger}) => {
    const router = new express.Router();

    router.use('/login', function(req, res) {
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

    router.use('/logout', function(req, res) {
        callBitgo({
            method: 'logout',
            req,
            res,
            logger,
            noToken: true
        });
    });

    router.use('/me', function(req, res) {
        callBitgo({
            method: 'me',
            req,
            res,
            logger
        });
    });

    return router;
};
