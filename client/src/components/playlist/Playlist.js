import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Playlist() {
  const { id } = useParams();
  useEffect(() => {
    console.log(id);
  }, []);
  return <p>playlist</p>;
}

export default Playlist;
