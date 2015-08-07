var defaults = {
  address: 'localhost',
  port: 10042,
  updateinterval: 1000,

  redis: {
    socket: null,
    host: '127.0.0.1',
    port: 6379,
    password: null
  }
};

var aliases = {
  d: 'debug',
  v: 'version'
};

module.exports = require('rucola')('ympc-kueui', defaults, aliases);
