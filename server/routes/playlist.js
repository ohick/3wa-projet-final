const {
  spotifyAuth, generalSearch, genreSearch, getPlaylists,
} = require('../controllers/spotify.controller');

const spotifySearchOpts = {
  schema: {},
  handler: generalSearch,
};

const genresSearchOpts = {
  schema: {},
  handler: genreSearch,
};

const getPlaylistsOpts = {
  schema: {},
  handler: getPlaylists,
};

module.exports = async (fastify, options, done) => {
  fastify.decorateRequest('token', '');
  fastify.decorateRequest('spotifyClientId', options.spotifyClientId);
  fastify.decorateRequest('spotifyClientSecret', options.spotifyClientSecret);
  fastify.decorateRequest('db', fastify.knex);
  fastify.addHook('preHandler', spotifyAuth);
  fastify.get('/search', spotifySearchOpts);
  fastify.get('/getGenres', genresSearchOpts);
  fastify.get('/playlists', getPlaylistsOpts);

  done();
};
