import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Login from './components/Login';
import Logout from './components/Logout';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Genres from './components/playlist/Genres';
import Playlists from './components/playlist/Playlists';
import Playlist from './components/playlist/Playlist';
import themeOptions from './themeOptions';
import CreatePlaylist from './components/playlist/CreatePlaylist';
import { useAuthState, validateSession, useAuthDispatch } from './context/auth';
import WithoutNav from './components/WithoutNav';
import WithNav from './components/WithNav';

const theme = createTheme(themeOptions);

function App() {
  const authState = useAuthState();
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const session = await validateSession(dispatch);
      if (!session?.id) {
        navigate('/login');
      }
    };

    if (!authState.id) {
      checkSession();
    }
  }, [authState]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route element={<WithoutNav />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<WithNav />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/my-playlists" element={<Playlists />} />
          <Route exact path="/my-playlists/:id" element={<Playlist />} />
          <Route path="/create" element={<CreatePlaylist />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
