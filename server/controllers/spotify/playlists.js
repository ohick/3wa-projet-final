const axios = require('axios');
const Playlist = require('../../models/playlist');

const baseURL = 'https://api.spotify.com/v1';

const getPlaylists = async (req, reply) => {
  const playlists = await Playlist.getPlaylists(req);
  reply.send(playlists);
};

const getPlaylistById = async (req, reply) => {
  const { playlist, tracksList } = await Playlist.getPlaylistById(req);
  const tracks = await axios.get(`${baseURL}/tracks`, {
    headers: {
      Authorization: `Bearer ${req.token.access_token}`,
    },
    params: { market: 'FR', ids: tracksList.join(',') },
  });

  reply.send({ tracks: tracks.data.tracks, playlist });
};

const addPlaylist = async (req, reply) => {
  await Playlist.addPlaylist(req);
  reply.code(204);
};

module.exports = { getPlaylists, getPlaylistById, addPlaylist };
