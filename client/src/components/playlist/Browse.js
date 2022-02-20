import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import CheckboxGroup from './CheckboxGroup';

function Browse({ sendResults }) {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      q: '',
      includeFields: [],
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
          Create your playlist
        </Typography>

        <Controller
          name="q"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              id="q"
              label="Search"
              name="q"
              fullWidth
            />
          )}
        />

        <CheckboxGroup
          control={control}
          setValue={setValue}
          name="includeFields"
          label="Limit search to :"
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ m: 3 }}
        >
          Search
        </Button>
      </Box>
    </FormControl>
  );
}

export default Browse;

Browse.propTypes = {
  sendResults: PropTypes.func.isRequired,
};
