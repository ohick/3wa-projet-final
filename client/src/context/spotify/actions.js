import axiosWrapper from '../../lib/axiosWrapper';

async function getPlaylists(dispatch, payload) {
  const { data } = await axiosWrapper({
    method: 'GET',
    url: '/playlists',
    params: {
      id: payload,
    },
  });

  dispatch({ type: 'GET_PLAYLISTS', payload: data });
}

async function getPlaylistById(dispatch, payload) {
  const { data } = await axiosWrapper({
    method: 'GET',
    url: `/playlist/${payload}`,
  });

  dispatch({ type: 'GET_PLAYLIST', payload: data });
}

async function addPlaylist(dispatch, payload) {
  const { data } = await axiosWrapper({
    method: 'POST',
    url: '/addPlaylist',
    data: {
      name: payload.playlist.name,
      description: payload.playlist.description,
      tracks: payload.tracks.map(({ track }) => (track.id)),
    },
  });
  dispatch({ type: 'ADD_PLAYLIST', payload: data });
}

async function updatePlaylist(dispatch, payload) {
  await axiosWrapper({
    method: 'PUT',
    url: `/playlist/${payload.id}`,
    data: payload,
  });

  dispatch({ type: 'UPDATE_PLAYLIST' });
}

async function deletePlaylist(dispatch, payload) {
  const { data } = await axiosWrapper({
    method: 'DELETE',
    url: `/playlist/${payload}`,
  });
  dispatch({ type: 'DELETE_PLAYLIST', payload: data });
}

export {
  getPlaylistById,
  getPlaylists,
  addPlaylist,
  updatePlaylist,
  deletePlaylist,
};
