import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import Navbar from './components/Navbar';
import Login from './components/Login';
import Logout from './components/Logout';
import Home from './components/Home';
import NotFound from './components/NotFound';
import themeOptions from './themeOptions';
import CreatePlaylist from './components/playlist/CreatePlaylist';
import { useAuthState } from './context/auth';

const theme = createTheme(themeOptions);

function ForceLogin() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Login />
      </Container>
    </ThemeProvider>
  );
}

function App() {
  const authState = useAuthState();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(!!authState.username);
  }, [authState]);

  return (isAuth ? (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreatePlaylist />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </ThemeProvider>
  ) : <ForceLogin />
  );
}

export default App;
