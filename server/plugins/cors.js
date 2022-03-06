const fp = require('fastify-plugin');

module.exports = fp(async (fastify) => {
  fastify.register(require('fastify-cors'), {
    origin: ['http://localhost:3000'],
    credentials: true,
    'Access-Control-Expose-Headers': 'Set-Cookie',
  });
});
