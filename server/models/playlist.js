const getPlaylists = async (request) => {
  const playlists = await request.db.select('id', 'spotify_id', 'name', 'description').from('playlist').where({ user_id: request.query.id });
  return playlists;
};

module.exports = { getPlaylists };
