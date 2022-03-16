import React, { useReducer } from 'react';

import { SpotifyReducer, initialState } from './reducer';

const SpotifyStateContext = React.createContext();
const SpotifyDispatchContext = React.createContext();

export function useSpotifyState() {
  const context = React.useContext(SpotifyStateContext);
  if (context === undefined) {
    throw new Error('useSpotifyState must be used within a SpotifyProvider');
  }

  return context;
}

export function useSpotifyDispatch() {
  const context = React.useContext(SpotifyDispatchContext);
  if (context === undefined) {
    throw new Error('useSpotifyDispatch must be used within a SpotifyProvider');
  }

  return context;
}

export function SpotifyProvider({ children }) {
  const [playlists, dispatch] = useReducer(SpotifyReducer, initialState);

  return (
    <SpotifyStateContext.Provider value={playlists}>
      <SpotifyDispatchContext.Provider value={dispatch}>{children}</SpotifyDispatchContext.Provider>
    </SpotifyStateContext.Provider>
  );
}
