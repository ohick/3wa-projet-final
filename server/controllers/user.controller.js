const User = require('../models/user.model');

const signUp = async (request, reply) => {
  const userAdded = await User.addUser(request);
  if (!userAdded) {
    return reply.badRequest();
  }

  request.session.authenticated = true;
  return reply.send('ok');
};

const login = async (request, reply) => {
  if (!request.body || !request.body.credential || !request.body.password) {
    return reply.badRequest('Username and Password are required!');
  }

  const user = await User.findByCredentials(request, reply);
  if (!user) {
    return reply.unauthorized('Wrong credentials');
  }

  request.session.userId = user.id;

  return reply.send(user);
};

const logout = (request, reply) => {
  if (!request.session.userId) {
    return reply.code(204);
  }

  request.destroySession((err) => {
    if (err) {
      return reply.internalServerError();
    }
  });

  return reply.send('ok');
};

const session = async (request, reply) => {
  if (!request.session.userId) {
    return reply.unauthorized('No session found');
  }

  const user = await User.findById(request, reply);
  return reply.send(user);
};

module.exports = {
  signUp, login, logout, session,
};
