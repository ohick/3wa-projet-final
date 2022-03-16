const {
  getToken,
  generalSearch,
  genreSearch,
  getPlaylists,
  getPlaylistById,
  addPlaylist,
  updatePlaylist,
  deletePlaylist,
} = require('../controllers/spotify.controller');

const {
  spotifySearchSchema,
  getPlaylistByIdSchema,
  getPlaylistsSchema,
  addPlaylistSchema,
  updatePlaylistSchema,
  deletePlaylistSchema,
} = require('../schemas/playlist.schemas');

const spotifySearchOpts = {
  schema: spotifySearchSchema,
  prehandler: getToken,
  handler: generalSearch,
};

const genresSearchOpts = {
  handler: genreSearch,
};

const getPlaylistsOpts = {
  schema: getPlaylistsSchema,
  handler: getPlaylists,
};

const getPlaylistByIdOpts = {
  schema: getPlaylistByIdSchema,
  prehandler: getToken,
  handler: getPlaylistById,
};

const addPlaylistOpts = {
  schema: addPlaylistSchema,
  prehandler: getToken,
  handler: addPlaylist,
};

const updatePlaylistOpts = {
  schema: updatePlaylistSchema,
  handler: updatePlaylist,
};

const deletePlaylistOpts = {
  schema: deletePlaylistSchema,
  handler: deletePlaylist,
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
  fastify.put('/playlist/:id', updatePlaylistOpts);
  fastify.delete('/playlist/:id', deletePlaylistOpts);
  fastify.post('/addPlaylist', addPlaylistOpts);

  done();
};
