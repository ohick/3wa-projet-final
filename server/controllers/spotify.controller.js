const { generalSearch, genreSearch } = require('./spotify/spotifySearch');
const { getToken } = require('./spotify/spotifyAuth');

const {
  getPlaylists,
  getPlaylistById,
  addPlaylist,
  updatePlaylist,
  deletePlaylist,
} = require('./spotify/playlists');

module.exports = {
  getToken,
  generalSearch,
  genreSearch,
  getPlaylists,
  getPlaylistById,
  addPlaylist,
  updatePlaylist,
  deletePlaylist,
};
