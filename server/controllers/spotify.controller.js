const { generalSearch, genreSearch } = require('./spotify/spotifySearch');
const spotifyAuth = require('./spotify/spotifyAuth');
const getArtist = require('./spotify/getArtist');
const getPlaylists = require('./spotify/getPlaylists');

module.exports = {
  spotifyAuth, generalSearch, genreSearch, getArtist, getPlaylists,
};
