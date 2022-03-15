const { generalSearch, genreSearch } = require('./spotify/spotifySearch');
const { getToken } = require('./spotify/spotifyAuth');
const getArtist = require('./spotify/getArtist');
const { getPlaylists, getPlaylistById, addPlaylist } = require('./spotify/playlists');

module.exports = {
  getToken,
  generalSearch,
  genreSearch,
  getArtist,
  getPlaylists,
  getPlaylistById,
  addPlaylist,
};
