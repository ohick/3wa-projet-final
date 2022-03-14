const fp = require('fastify-plugin');

module.exports = fp(async (fastify) => {
  fastify.register(require('fastify-cors'), {
    origin: ['https://accounts.spotify.com', 'http://localhost:3000'],
    credentials: true,
    'Access-Control-Expose-Headers': 'Set-Cookie',
  });
});
