/*
 * Created by nassi on 24/03/16.
 */

var Redis = require('ioredis');

function RedisFactory() {
}

RedisFactory.prototype.getClient = function (options) {
    var client;
    if (!options.host) {
        throw new Error('options missing redis host');
    }
    if (!options.port) {
        throw new Error('options missing redis port');
    }
    if (options.cluster) {
        client = new Redis.Cluster([{ host: options.host, port: options.port }]);
    }
    else if (options.sentinel) {
        client = new Redis({
            sentinels: [{ host: options.host, port: options.port }],
            name: options.masterName || 'mymaster',
            role: options.role || undefined //slave
        });
    }
    else {
        client = new Redis({
            host: options.host,
            port: options.port
        });
    }
    return client;
};

module.exports = new RedisFactory();
