import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import axiosWrapper from '../../lib/axiosWrapper';
import Track from './Track';

function Playlist() {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const playlist = await axiosWrapper({
        method: 'GET',
        url: `/playlist/${id}`,
      });

      setData(playlist.data);
    };
    fetchData();
  }, []);

  return Object.keys(data).length ? (
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
              <Grid key={track.id} item>
                <Track item={track} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Link component={RouterLink} to="/my-playlists">Retour à la liste</Link>
    </>
  ) : <p>chargement</p>;
}

export default Playlist;
//
