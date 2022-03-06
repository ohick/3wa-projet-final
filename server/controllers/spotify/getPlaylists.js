const Playlist = require('../../models/playlist');

module.exports = async (req, reply) => {
  const playlists = await Playlist.getPlaylists(req);
  reply.send(playlists);
};
