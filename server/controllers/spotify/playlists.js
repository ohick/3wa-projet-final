const axios = require('axios');
const Playlist = require('../../models/playlist.model');

const baseURL = 'https://api.spotify.com/v1';

const getPlaylists = async (req, reply) => {
  if (!req.session.userId) return reply.unauthorized('No session found');
  const playlists = await Playlist.getPlaylists(req);
  return reply.send(playlists);
};

const getPlaylistById = async (req, reply) => {
  if (!req.session.userId) return reply.unauthorized('No session found');

  const { playlist, tracks } = await Playlist.getPlaylistById(req);
  const tracksIds = tracks.map((track) => track.spotify_id).join(',');
  const spotifyTracks = await axios.get(`${baseURL}/tracks`, {
    headers: {
      Authorization: `Bearer ${req.token.access_token}`,
    },
    params: { market: 'FR', ids: tracksIds },
  });

  const trackList = tracks.map((track) => ({
    trackId: track.id,
    track: spotifyTracks.data.tracks.find((t) => t.id === track.spotify_id),
  }));

  return reply.send({ tracks: trackList, playlist });
};

const addPlaylist = async (req, reply) => {
  if (!req.session.userId) return reply.unauthorized('No session found');
  const playlist = await Playlist.addPlaylist(req);
  return reply.send(playlist);
};

const updatePlaylist = async (req, reply) => {
  if (!req.session.userId) return reply.unauthorized('No session found');
  const playlist = await Playlist.updatePlaylist(req);
  return reply.send(playlist);
};

const deletePlaylist = async (req, reply) => {
  if (!req.session.userId) return reply.unauthorized('No session found');
  await Playlist.deletePlaylist(req);
  return reply.code(203);
};

module.exports = {
  getPlaylists,
  getPlaylistById,
  addPlaylist,
  updatePlaylist,
  deletePlaylist,
};
