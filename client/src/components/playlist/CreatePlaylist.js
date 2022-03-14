import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

function CreatePlaylist() {
  const navigate = useNavigate();
  const [displayResults, setDisplayResults] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [selection, setSelection] = useState([]);
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
    console.log({
      name: playlist.name,
      description: playlist.name,
      tracks: selection.map((track) => track.uri),
    });
    await axiosWrapper({
      method: 'POST',
      url: '/addPlaylist',
      data: {
        name: playlist.name,
        description: playlist.name,
        tracks: selection.map((track) => track.uri),
      },
    });
    return navigate('/my-playlists');
  };

  const addTrack = (trackData) => {
    const newSelection = [...selection, trackData];
    setSelection(newSelection);
  };

  const removeTrack = (uri) => {
    const newSelection = selection.filter((track) => track.uri !== uri);
    setSelection(newSelection);
  };

  return (
    displayConfirmation ? <ConfirmPlaylist onSubmit={handleSubmit} />
      : (
        <Grid container spacing={0}>
          <Grid item xs={5}>
            <Search sendResults={(res) => getResults(res)} />
          </Grid>
          <Grid item xs={5}>
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
                {selection.map((track) => (
                  <ListItem
                    key={track.uri}
                    secondaryAction={(
                      <IconButton edge="end" aria-label="delete" onClick={() => removeTrack(track.uri)}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                  >
                    <ListItemText
                      primary={`${track.name} - ${track.artist.name}`}
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
      )
  );
}

export default CreatePlaylist;
