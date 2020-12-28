const server = require('./app.js')
const config = require('./config/config');
server.listen(config.port, () => {
    console.log('Express server listening on port ' + config.port);
 });