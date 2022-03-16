import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

import { loginUser, useAuthDispatch } from '../context/auth';

function Login() {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const [error, setError] = useState({ display: false, message: '' });
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      credential: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    const user = await loginUser(dispatch, data);

    if (user) {
      return navigate('/my-playlists');
    }

    reset();
    return setError({ display: true, message: 'Une erreur est survenue, veuillez réessayer' });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          {error.display && (<Alert severity="error">{error.message}</Alert>)}
          <Controller
            name="credential"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                fullWidth
                id="credential"
                label="Email Address"
                name="credential"
                autoComplete="email"
                autoFocus
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
