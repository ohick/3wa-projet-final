import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Track from './Track';

import { useAuthState } from '../../context/auth';
import { useSpotifyState, useSpotifyDispatch, getPlaylistById } from '../../context/spotify';

function Playlist() {
  const [data, setData] = useState({});
  const authState = useAuthState();
  const dispatch = useSpotifyDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const spotifyState = useSpotifyState();

  useEffect(() => {
    if (!authState.id) return navigate('/login');
    const fetchData = async () => {
      await getPlaylistById(dispatch, id);
    };
    return fetchData();
  }, []);

  useEffect(() => {
    const playlist = spotifyState.find((p) => p.playlist.id === id.toString());
    if (playlist?.tracks) {
      setData(playlist);
    }
  }, [spotifyState]);

  return authState.id && (Object.keys(data).length ? (
    <>
      <Typography variant="h1" component="div">
        {data.playlist.name}
      </Typography>
      <Typography variant="subtitle1" component="div">
        {data.playlist.description}
      </Typography>
      <Grid sx={{ flexGrow: 1, my: 3 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            {data.tracks.map((track) => (
              <Grid key={track.trackId} item>
                <Track item={track} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Link component={RouterLink} to="/my-playlists">Retour à la liste</Link>
    </>
  ) : <p>chargement</p>);
}

export default Playlist;
//
