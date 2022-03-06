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

  request.session.userId = user.id;

  reply.send(user);
};

const logout = (request, reply) => {
  if (!request.session.userId) {
    reply.code(204);
  }

  request.destroySession((err) => {
    if (err) {
      reply.internalServerError();
    }
  });

  reply.send('ok');
};

const session = (request, reply) => {
  if (!request.session.userId) {
    reply.unauthorized('No session found');
  }

  reply.code(204).send(request.session.userId);
};

module.exports = {
  signUp, login, logout, session,
};
