import React, { useEffect, useState } from 'react';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function ResultCard({ data }) {
  const [image, setImage] = useState({});

  useEffect(() => {
    const img = data.images.find((item) => item.height < 700);
    setImage(img);
  });

  return (
    <Card sx={{ maxWidth: 400 }} raised>
      {image && (
        <CardMedia
          component="img"
          height={image.height}
          image={image.url}
          alt={data.name}
        />
      )}

      <CardContent>
        <Typography variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {data.genres.join(', ')}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Followers:
          {' '}
          {data.followers.total}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"><a href={data.uri}>Open on Spotify</a></Button>
      </CardActions>
    </Card>
  );
}

export default ResultCard;
