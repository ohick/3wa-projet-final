import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';

import NavBar from './Navbar';

export default function WithNav() {
  return (
    <>
      <NavBar />
      <Container component="main" maxWidth="lg">
        <Outlet />
      </Container>
    </>
  );
}
