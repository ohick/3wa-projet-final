const bcrypt = require('bcrypt');

const saltRounds = 10;

const findByCredentials = async (req) => {
  const user = await req.db.first('id', 'username', 'role', 'password').from('user').where({ email: req.body.credential }).orWhere({ username: req.body.credential });
  if (!user) return null;
  const passwordIsCorrect = bcrypt.compare(req.body.password, user.password);
  return passwordIsCorrect ? { username: user.username, id: user.id, role: user.role } : null;
};

const findById = async (req) => {
  const id = req.session.userId;
  const user = await req.db.first('id', 'username', 'email', 'role').from('user').where({ id });
  return user || null;
};

const addUser = async (req) => {
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

  const insert = await req.db('user').insert({
    username: req.body.username, password: hashedPassword, email: req.body.email, role: 'user',
  });

  return insert.length > 0;
};

module.exports = { findByCredentials, addUser, findById };
