var express = require('express');
var kue = require('kue');
var ui = require('kue-ui');
var log = require('bole')('kueui');

module.exports = server;

function server (config) {
  config.get('redis.socket')
    ? kue.createQueue({
        prefix: 'queue',
        redis: {
          socket: config.get('redis.socket'),
          auth: config.get('redis.password')
        }
      })

    : kue.createQueue({
      prefix: 'queue',
      redis: {
        port: config.get('redis.port'),
        host: config.get('redis.host'),
        auth: config.get('redis.password')
      }
    });

  var app = express();

  ui.setup({
    apiURL: '/api',
    baseURL: '/ui',
    updateInterval: parseInt(config.get('updateinterval'), 10)
  });

  app.use('/api', kue.app);
  app.use('/ui', ui.app);

  function start () {
    app.listen(parseInt(config.get('port'), 10), config.get('address'), function (err) {
      if (err) {
        log.error(err);
        process.exit(1);
      }

      log.info('listening on', config.get('address') + ':' + config.get('port'));
    });
  }

  return {
    start: start
  };
}
