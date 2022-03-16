import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';

function Search({ sendResults }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      q: '',
    },
  });

  const onSubmit = (data) => {
    sendResults(data);
  };

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
          Tracks search
        </Typography>

        <Controller
          rules={{ required: true }}
          name="q"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              id="q"
              label="Search for a track"
              name="q"
              fullWidth
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 1 }}
        >
          Search
        </Button>
      </Box>
    </FormControl>
  );
}

export default Search;

Search.propTypes = {
  sendResults: PropTypes.func.isRequired,
};
