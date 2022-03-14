const axios = require('axios');
const Playlist = require('../../models/playlist');
const { getAccess } = require('./spotifyAuth');

const baseURL = 'https://api.spotify.com/v1';

const getPlaylists = async (req, reply) => {
  const playlists = await Playlist.getPlaylists(req);
  reply.send(playlists);
};

const getPlaylistById = async (req, reply) => {
  const playlist = await Playlist.getPlaylistById(req);
  const fields = 'external_urls, , images, name, followers, tracks, uri';
  const spotifyPlaylist = await axios.get(`${baseURL}/playlists/${playlist.spotify_id}`, {
    headers: {
      Authorization: `Bearer ${req.token.access_token}`,
    },
    params: { fields, market: 'FR' },
  });

  reply.send(spotifyPlaylist.data);
};

const addPlaylist = async (req, reply) => {
  try {
    getAccess(req, reply);
    const { data } = await axios.post(`${baseURL}/users/${req.spotifyUserId}/playlists`, {
      name: req.body.name,
      description: req.body.description,
    }, {
      headers: {
        Authorization: `Bearer ${req.token.access_token}`,
      },
    });

    console.log('ICIIII', data);
    const { data: tracks } = await axios.post(`${baseURL}/playlists/${data.id}/tracks`, {
      uris: req.body.tracks.join(','),
    });
    const playlist = await Playlist.addPlaylist(req);
    console.log('addPlaylist', tracks);
    console.log('addPlaylist', playlist);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getPlaylists, getPlaylistById, addPlaylist };
