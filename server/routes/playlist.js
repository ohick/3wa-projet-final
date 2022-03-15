const {
  getToken,
  generalSearch,
  genreSearch,
  getPlaylists,
  getPlaylistById,
  addPlaylist,
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

const getPlaylistByIdOpts = {
  schema: {},
  prehandler: getToken,
  handler: getPlaylistById,
};

const addPlaylistOpts = {
  schema: {},
  prehandler: getToken,
  handler: addPlaylist,
};

module.exports = async (fastify, options, done) => {
  fastify.decorateRequest('token', '');
  fastify.decorateRequest('spotifyClientId', options.spotifyClientId);
  fastify.decorateRequest('redirectUri', options.redirectUri);
  fastify.decorateRequest('spotifyClientSecret', options.spotifyClientSecret);
  fastify.decorateRequest('spotifyUserId', options.spotifyUserId);
  fastify.decorateRequest('db', fastify.knex);

  fastify.addHook('preHandler', getToken);

  fastify.get('/search', spotifySearchOpts);
  fastify.get('/getGenres', genresSearchOpts);
  fastify.get('/playlists', getPlaylistsOpts);
  fastify.get('/playlist/:id', getPlaylistByIdOpts);

  fastify.post('/addPlaylist', addPlaylistOpts);

  done();
};
