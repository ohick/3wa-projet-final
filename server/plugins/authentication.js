const fp = require('fastify-plugin');
const fastifySession = require('@fastify/session');
const fastifyCookie = require('fastify-cookie');

function authentication(fastify, opts, done) {
  fastify.register(fastifyCookie);
  fastify.register(fastifySession, {
    cookieName: 'sessionId',
    secret: opts.secret,
    cookie: { secure: false },
    expires: 1800000,
  });

  done();
}

module.exports = fp(authentication);
