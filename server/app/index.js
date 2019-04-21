const express = require('express');
const config = require('config');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const path = require('path');
const winston = require('winston');

const wallet = require('../middlewares/wallet');
const auth = require('../middlewares/auth');

const app = express();
app.logger = winston.createLogger({
    level: 'info',
    exitOnError: false,
    transports: [
        new winston.transports.Console({
            colorize: true,
            timestamp: true,
            handleExceptions: true,
            humanReadableUnhandledException: true
        })
    ]
});

const urlPrefix = config.get('urlPrefix');

const apiRouter = express.Router();
apiRouter
    .use(auth({logger: app.logger}))
    .use(wallet({logger: app.logger}));

const appRouter = express.Router();
appRouter
    .use(compression())
    .use(cookieParser())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use(express.static(config.get('staticDir')))
    .use('/api', apiRouter)
    .get('*', function(req, res) {
        res.sendFile(path.resolve(path.join(config.get('staticDir'), '/index.html')));
    });

app.use('/' + urlPrefix, appRouter);
module.exports = app;
