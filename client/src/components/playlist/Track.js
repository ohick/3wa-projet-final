import React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

function Track({ item, add = false, addTrack }) {
  const track = item.track || item;

  const handleClick = (data) => {
    addTrack({
      track: {
        id: data.id,
        name: data.name,
        artist: {
          name: data.artists[0].name, id: data.artists[0].id,
        },
        album: {
          name: data.album.name, id: data.album.id,
        },
      },
    });
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={track.album.images[1].url}
        alt="illustration"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {track.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {track.artists[0].name}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <audio controls="controls">
            <source src={track.preview_url} type="audio/mpeg" />
          </audio>
        </Box>
      </CardContent>
      <CardActions sx={{ pt: 0 }}>
        {add && (
          <IconButton edge="end" aria-label="add" onClick={() => handleClick(track)}>
            <AddIcon />
            &nbsp;
            <Typography variant="caption">Ajouter à la liste</Typography>
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}

export default Track;
