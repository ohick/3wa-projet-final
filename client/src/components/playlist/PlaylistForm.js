import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemText from '@mui/material/ListItemText';

import axiosWrapper from '../../lib/axiosWrapper';
import Search from './Search';
import Track from './Track';
import ConfirmPlaylist from './ConfirmPlaylist';

function PlaylistForm({ editContent = null, onSubmit }) {
  const [displayResults, setDisplayResults] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [selection, setSelection] = useState(editContent?.tracks || []);
  const [displaySelection, setDisplaySelection] = useState(!!editContent);
  const [displayConfirmation, setDisplayConfirmation] = useState(false);

  const getResults = async (res) => {
    const { data } = await axiosWrapper({
      url: '/search',
      method: 'GET',
      params: res,
    });

    setTracks(data.tracks.items);
    setDisplayResults(true);
  };

  const handleSubmit = async (playlist) => {
    onSubmit({ playlist, tracks: selection });
  };

  const addTrack = (trackData) => {
    const newSelection = [...selection, trackData];
    setDisplaySelection(true);
    setSelection(newSelection);
  };

  const removeTrack = (id) => {
    const newSelection = selection.filter(({ track }) => track.id !== id);
    setSelection(newSelection);
  };

  return displayConfirmation ? <ConfirmPlaylist onSubmit={handleSubmit} title="Finalize your playlist creation" content={editContent} /> : (
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <Search sendResults={(res) => getResults(res)} />
      </Grid>
      {displaySelection && (
        <Grid item xs={8}>
          <Box
            noValidate
            sx={{
              mt: 1, marginTop: 8, boxShadow: 2, padding: 2, borderRadius: 1,
            }}
          >
            <Typography component="h1" variant="h5">
              Selection
            </Typography>

            <List dense={false}>
              {selection.map(({ track }) => (
                <ListItem
                  key={track.id}
                  secondaryAction={(
                    <IconButton edge="end" aria-label="delete" onClick={() => removeTrack(track.id)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                >
                  <ListItemText
                    primary={`${track.name} - ${track.artist?.name || track.artists[0].name}`}
                  />
                </ListItem>
              ))}
            </List>
            <Button
              type="button"
              variant="contained"
              sx={{ mt: 1 }}
              onClick={() => setDisplayConfirmation(true)}
            >
              Confirm Selection
            </Button>
          </Box>
        </Grid>
      )}
      <Grid sx={{ flexGrow: 1, my: 3 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            {displayResults && tracks.map((track) => (
              <Grid key={track.id} item>
                <Track item={{ track }} add addTrack={(data) => addTrack(data)} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>

  );
}

export default PlaylistForm;
