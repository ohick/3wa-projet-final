import React from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import { useSpotifyDispatch, addPlaylist } from '../../context/spotify';
import PlaylistForm from './PlaylistForm';

function CreatePlaylist() {
  const navigate = useNavigate();
  const dispatch = useSpotifyDispatch();

  const onSubmit = async (formData) => {
    await addPlaylist(dispatch, formData);
    return navigate('/my-playlists');
  };

  return (
    <>
      <Typography component="h1" variant="h3" sx={{ mt: 5 }}>
        Create a new Playlist
      </Typography>
      <PlaylistForm onSubmit={(formData) => onSubmit(formData)} text="Edit" />
    </>
  );
}

export default CreatePlaylist;
