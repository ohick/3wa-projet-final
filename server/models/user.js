const bcrypt = require('bcrypt');

const saltRounds = 10;

const findByCredentials = async (request) => {
  const user = await request.db.first('*').from('user').where({ email: request.body.credential }).orWhere({ username: request.body.credential });
  if (!user) return null;
  const passwordIsCorrect = bcrypt.compare(request.body.password, user.password);
  return passwordIsCorrect ? { username: user.username, id: user.id } : null;
};

const addUser = async (request) => {
  const hashedPassword = await bcrypt.hash(request.body.password, saltRounds);

  const insert = await request.db('user').insert({
    username: request.body.username, password: hashedPassword, email: request.body.email, role: 'user',
  });

  return insert.length > 0;
};

module.exports = { findByCredentials, addUser };