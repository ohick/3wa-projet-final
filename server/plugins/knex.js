const fp = require('fastify-plugin');

module.exports = fp(async (fastify) => {
  const options = {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 'toto',
      database: '3waprojet',
    },
  };
  fastify.register(require('fastify-knexjs'), options, (err) => console.error(err));
});
