const {
  signUp, login, logout, session,
} = require('../controllers/user.controller');
const { registerUserSchema, loginUserSchema } = require('../schemas/user.schemas');

module.exports = async (fastify, options, done) => {
  fastify.decorateRequest('db', fastify.knex);
  fastify.decorateRequest('secret', options.secret);

  const loginOptions = {
    schema: loginUserSchema,
    handler: login,
  };

  const signUpOptions = {
    schema: registerUserSchema,
    handler: signUp,
  };

  const logoutOptions = {
    handler: logout,
  };

  const sessionOptions = {
    handler: session,
  };

  fastify.post('/login', loginOptions);
  fastify.post('/signup', signUpOptions);
  fastify.get('/logout', logoutOptions);
  fastify.get('/session', sessionOptions);

  done();
};
