import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import PlaylistForm from './PlaylistForm';

import { useAuthState } from '../../context/auth';
import {
  useSpotifyState, useSpotifyDispatch, updatePlaylist, getPlaylistById,
} from '../../context/spotify';

function EditPlaylist() {
  const navigate = useNavigate();
  const dispatch = useSpotifyDispatch();
  const authState = useAuthState();
  const [data, setData] = useState({});
  const { id } = useParams();
  const spotifyState = useSpotifyState();

  useEffect(() => {
    const playlist = spotifyState.find((p) => p.playlist.id === id.toString());
    if (playlist?.tracks) {
      setData(playlist);
    }
  }, [spotifyState, id]);

  useEffect(() => {
    if (!authState.id) return navigate('/login');
    const fetchData = async () => {
      await getPlaylistById(dispatch, id);
    };
    return fetchData();
  }, [authState.id, id, dispatch, navigate]);

  const onSubmit = async (formData) => {
    const payload = {
      id,
      name: formData.playlist.name,
      description: formData.playlist.description,
      tracks: formData.tracks.map((track) => ({
        trackId: track.trackId,
        spotify_id: track.track.id,
      })),
    };
    updatePlaylist(dispatch, payload);
    return navigate('/my-playlists');
  };

  return (
    <>
      <Typography component="h1" variant="h3" sx={{ mt: 5 }}>
        Edit your Playlist
      </Typography>
      {Object.keys(data).length ? (
        <PlaylistForm editContent={data} onSubmit={(formData) => onSubmit(formData)} text="Edit" />
      ) : 'chargement'}
    </>
  );
}

export default EditPlaylist;
