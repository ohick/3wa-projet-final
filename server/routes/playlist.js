const { spotifyAuth, spotifySearch } = require('../controllers/spotify.controller');

const spotifySearchOpts = {
  schema: {},
  handler: spotifySearch,
};

module.exports = async (fastify, options) => {
  fastify.decorateRequest('token', '');
  fastify.decorateRequest('spotifyClientId', options.spotifyClientId);
  fastify.decorateRequest('spotifyClientSecret', options.spotifyClientSecret);
  fastify.addHook('preHandler', spotifyAuth);
  fastify.get('/search', spotifySearchOpts);
};
