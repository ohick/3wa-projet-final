const fp = require('fastify-plugin');

module.exports = fp(async (fastify, opts) => {
  const options = {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: opts.dbUser,
      password: opts.dbPass,
      database: opts.dbName,
    },
  };
  fastify.register(require('fastify-knexjs'), options, (err) => console.error(err));
});
