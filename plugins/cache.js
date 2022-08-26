'use strict';

const fp = require('fastify-plugin');
const NodeCache = require('node-cache');

module.exports = fp(
  async function (fastify, opts) {
    const { CACHE_TTL_SECONDS, CACHE_CHECK_PERIOD_SECONDS } = fastify.config;

    let store = new NodeCache({
      stdTTL: CACHE_TTL_SECONDS,
      checkperiod: CACHE_CHECK_PERIOD_SECONDS,
    });

    fastify.addHook('onSend', (req, res, payload, done) => {
      if (req.method === 'GET') {
        if (!store.has(req.url)) {
          store.set(req.url, payload);
        }
      }
      done();
    });

    fastify.addHook('onRequest', (req, res, done) => {
      if (req.method === 'GET') {
        const cached = store.get(req.url);
        if (cached) {
          res.headers({
            ...res.headers,
            'Cache-control': `public, max-age=${store.options.stdTTL}`,
            'Content-Type': 'application/json; charset=utf-8',
          });
          res.code(200).send(cached);
        }
      }
      done();
    });
  },
  {
    dependencies: ['fastifyEnv'],
  }
);
