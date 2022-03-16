const { generalSearch, genreSearch } = require('./spotify/spotifySearch');
const { getToken } = require('./spotify/spotifyAuth');
const getArtist = require('./spotify/getArtist');
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
  getArtist,
  getPlaylists,
  getPlaylistById,
  addPlaylist,
  updatePlaylist,
  deletePlaylist,
};
