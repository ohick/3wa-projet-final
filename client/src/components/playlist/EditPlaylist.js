import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import axiosWrapper from '../../lib/axiosWrapper';
import PlaylistForm from './PlaylistForm';

function EditPlaylist() {
  const navigate = useNavigate();
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

  const onSubmit = async (formData) => {
    await axiosWrapper({
      method: 'PUT',
      url: `/playlist/${id}`,
      data: {
        id,
        name: formData.playlist.name,
        description: formData.playlist.description,
        tracks: formData.tracks.map((track) => ({
          trackId: track.trackId,
          spotify_id: track.track.id,
        })),
      },
    });
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
