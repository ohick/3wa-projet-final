import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import { SpotifyProvider } from '../context/spotify';

import NavBar from './Navbar';

export default function WithNav() {
  return (
    <SpotifyProvider>
      <NavBar />
      <Container component="main" maxWidth="lg">
        <Outlet />
      </Container>
    </SpotifyProvider>
  );
}
