const fp = require('fastify-plugin');
const fastifySession = require('@fastify/session');
const fastifyCookie = require('fastify-cookie');

function authentication(fastify, opts, done) {
  fastify.register(fastifyCookie);
  fastify.register(fastifySession, {
    secret: opts.secret,
    cookie: {
      secure: false,
      maxAge: 12900000,
    },
    expires: 2800000,
  });

  done();
}

module.exports = fp(authentication);
