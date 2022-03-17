export const initialState = [];

export const SpotifyReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_PLAYLIST': {
      return state.map(({ playlist }) => {
        if (playlist.id === payload.playlist.id) {
          return payload;
        }
        return { playlist };
      });
    }

    case 'GET_PLAYLISTS':
      return payload;
    case 'ADD_PLAYLIST':
      return [...state, { playlist: payload }];
    case 'UPDATE_PLAYLIST':
      return state;
    case 'DELETE_PLAYLIST':
      return state.filter((playlist) => playlist.id !== payload.id);
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};
