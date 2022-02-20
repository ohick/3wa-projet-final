const User = require('../models/user');

const signUp = async (request, reply) => {
  const userAdded = await User.addUser(request);
  if (!userAdded) {
    reply.badRequest();
  }

  request.session.authenticated = true;
  reply.send('ok');
};

const login = async (request, reply) => {
  if (!request.body || !request.body.credential || !request.body.password) {
    reply.badRequest('Username and Password are required!');
  }

  const user = await User.findByCredentials(request, reply);
  if (!user) {
    reply.unauthorized('Wrong credentials');
  }

  request.session.authenticated = true;
  reply.send(user);
};

const logout = (request, reply) => {
  if (!request.session.authenticated) reply.code(204);

  request.destroySession((err) => {
    if (err) {
      reply.internalServerError();
    }
  });

  reply.send('ok');
};

module.exports = { signUp, login, logout };
