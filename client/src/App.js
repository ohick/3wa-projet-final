import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Login from './components/Login';
import Logout from './components/Logout';
import NotFound from './components/NotFound';
import Playlists from './components/playlist/Playlists';
import Playlist from './components/playlist/Playlist';
import themeOptions from './themeOptions';
import CreatePlaylist from './components/playlist/CreatePlaylist';
import { useAuthState, validateSession, useAuthDispatch } from './context/auth';
import WithoutNav from './components/WithoutNav';
import WithNav from './components/WithNav';
import EditPlaylist from './components/playlist/EditPlaylist';
import DeletePlaylist from './components/playlist/DeletePlaylist';

const theme = createTheme(themeOptions);

function App() {
  const authState = useAuthState();
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const session = await validateSession(dispatch);
      console.log(!session?.id)
      if (!session?.id) {
        return navigate('/login');
      }
      return null;
    };

    if (!authState.id) {
      checkSession();
    }
  }, [authState, dispatch, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {authState.id ? (
        <Routes>
          <Route element={<WithoutNav />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<WithNav />}>
            <Route exact path="/my-playlists" element={<Playlists />} />
            <Route exact path="/my-playlists/:id" element={<Playlist />} />
            <Route exact path="/my-playlists/:id/edit" element={<EditPlaylist />} />
            <Route exact path="/my-playlists/:id/delete" element={<DeletePlaylist />} />
            <Route path="/create-playlist" element={<CreatePlaylist />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route element={<WithoutNav />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      )
      }

    </ThemeProvider>
  )
}

export default App;
