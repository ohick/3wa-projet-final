const getPlaylists = async (req) => {
  if (!req.session.userId) return null;

  const playlists = await req.db.select('id', 'name').from('playlist').where({ user_id: req.query.id });
  return playlists.map((playlist) => ({ playlist }));
};

const getPlaylistById = async (req) => {
  const [playlist, tracks] = await Promise.all([
    req.db.first('id', 'name', 'description').from('playlist').where({ id: req.params.id }),
    req.db.select('id', 'spotify_id').from('track').where({ playlist_id: req.params.id }),
  ]);

  return { playlist, tracks };
};

const addPlaylist = async (req) => {
  const addedPlaylist = await req.db('playlist').insert({
    name: req.body.name,
    description: req.body.description,
    user_id: req.session.userId,
  });

  const rows = req.body.tracks.map((track) => ({
    spotify_id: track,
    playlist_id: addedPlaylist[0],
  }));

  return req.db('track').insert(rows);
};

const updatePlaylist = async (req) => {
  const queries = req.body.tracks.map((track) => {
    if (!track.trackId) {
      return req.db('track')
        .insert({ spotify_id: track.spotify_id, playlist_id: req.body.id });
    }
    return null;
  });

  const tracksId = await req.db('track').select('id').where({ playlist_id: req.body.id });
  const deletedTracks = tracksId.filter(({ id }) => (
    req.body.tracks.every((track) => track.trackId !== id.toString())
  ));

  if (deletedTracks.length) queries.push(...deletedTracks.map((track) => req.db('track').where('id', track.id).del()));

  const updatedPlaylist = await Promise.all([
    req.db('playlist')
      .where({ id: req.body.id })
      .update({
        name: req.body.name,
        description: req.body.description,
      }),
    ...queries,
  ]);

  return updatedPlaylist;
};

const deletePlaylist = async (req) => req.db('playlist').where('id', req.params.id).del();

module.exports = {
  getPlaylists,
  getPlaylistById,
  addPlaylist,
  updatePlaylist,
  deletePlaylist,
};
