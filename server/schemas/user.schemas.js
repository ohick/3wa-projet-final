const typeString = { type: 'string' };
const typeNum = { type: 'number' };

const getUsersSchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          username: typeString,
          email: typeString,
        },
      },
    },
  },
};

const registerUserSchema = {
  body: {
    type: 'object',
    required: ['username', 'email', 'password'],
    properties: {
      username: typeString,
      email: typeString,
      password: typeString,
    },
  },
  response: {
    200: typeString,
  },
};

const loginUserSchema = {
  body: {
    type: 'object',
    required: ['credential', 'password'],
    properties: {
      credential: typeString,
      password: typeString,
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        username: typeString,
        id: typeNum,
      },
    },
  },
};

module.exports = { getUsersSchema, registerUserSchema, loginUserSchema };
