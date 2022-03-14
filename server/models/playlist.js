const getPlaylists = async (request) => {
  const playlists = await request.db.select('id', 'spotify_id', 'name').from('playlist').where({ user_id: request.query.id });
  return playlists;
};

const getPlaylistById = async (request) => {
  const playlist = await request.db.first('id', 'spotify_id', 'name', 'description').from('playlist').where({ id: request.params.id });
  return playlist;
};

const addPlaylist = async (request) => {
  const add = await request.db('playlist').insert({
    spotify_id: request.spotify_id,
    name: request.body.name,
    description: request.body.description,
  });
  return add;
};

module.exports = { getPlaylists, getPlaylistById, addPlaylist };
