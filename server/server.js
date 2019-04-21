const http = require('http');
const config = require('config');
const app = require('./app');

app.server = http.createServer(app);
app.server.listen(config.get('port'), () => {
    const host = app.server.address().address;
    const port = app.server.address().port;
    app.logger.info(`Listening at http(s)://${host}:${port}`);
});
