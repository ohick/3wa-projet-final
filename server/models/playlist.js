const getPlaylists = async (request) => {
  const playlists = await request.db.select('id', 'name').from('playlist').where({ user_id: request.query.id });
  return playlists;
};

const getPlaylistById = async (request) => {
  const [playlist, tracks] = await Promise.all([
    request.db.first('id', 'name', 'description').from('playlist').where({ id: request.params.id }),
    request.db.select('spotify_id').from('track').where({ playlist_id: request.params.id }),
  ]);
  const tracksList = tracks.map((track) => track.spotify_id);
  return { playlist, tracksList };
};

const addPlaylist = async (request) => {
  const addedPlaylist = await request.db('playlist').insert({
    name: request.body.name,
    description: request.body.description,
    user_id: request.session.userId,
  });

  const rows = request.body.tracks.map((track) => ({
    spotify_id: track,
    playlist_id: addedPlaylist[0],
  }));

  return request.db('track').insert(rows);
};

module.exports = { getPlaylists, getPlaylistById, addPlaylist };
