const express = require('express');
const config = require('config');

const {getBitgo, errorHandler} = require('../../services/bitgo');

module.exports = ({logger}) => {
    const router = new express.Router();

    router.use('/login', function(req, res) {
        const bitgo = getBitgo();
        const {username, password, otp} = req.body;
        bitgo.authenticate({username, password, otp})
            .then(function(response) {
                res.json({
                    ...response
                });
            })
            .catch((e) => errorHandler(logger, res, e));
    });

    router.use('/logout', function(req, res) {
        const bitgo = getBitgo();
        bitgo.logout()
            .then(function(response) {
                res.json({
                    ...response
                });
            })
            .catch((e) => errorHandler(logger, res, e));
    });

    return router;
};
