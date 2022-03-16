import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function ConfirmPlaylist({ onSubmit, content = null }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: content?.playlist.name || '',
      description: content?.playlist.description || '',
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
        <Controller
          rules={{ required: true }}
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
          rules={{ required: true }}
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
