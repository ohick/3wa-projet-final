import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function ConfirmPlaylist({ onSubmit }) {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  return (
    <FormControl>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          mt: 1, marginTop: 8, boxShadow: 2, padding: 2, borderRadius: 1,
        }}
      >
        <Typography component="h1" variant="h5">
          Create your playlist
        </Typography>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              id="name"
              label="Enter a name"
              name="name"
              fullWidth
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              id="description"
              label="Enter a description"
              name="description"
              multiline
              rows={2}
              fullWidth
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 1 }}
        >
          Submit
        </Button>
      </Box>
    </FormControl>
  );
}

export default ConfirmPlaylist;
