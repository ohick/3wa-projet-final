const { generalSearch, genreSearch } = require('./spotify/spotifySearch');
const { getToken, getAccess } = require('./spotify/spotifyAuth');
const getArtist = require('./spotify/getArtist');
const { getPlaylists, getPlaylistById, addPlaylist } = require('./spotify/getPlaylists');

module.exports = {
  getToken,
  getAccess,
  generalSearch,
  genreSearch,
  getArtist,
  getPlaylists,
  getPlaylistById,
  addPlaylist,
};
