import React, { useState, useEffect } from 'react';
import axiosWrapper from '../../lib/axiosWrapper';

function Genres({ genres }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStuff = async () => {
      const spotifyGenres = await axiosWrapper({
        url: '/getGenres',
        method: 'GET',
      });
      setData(spotifyGenres);
    };
    if (!genres) return fetchStuff();
    return setData(genres);
  }, []);

  return data.genres ? data.genres.map((genre) => <p>{genre}</p>) : <p>chargement</p>;
}

export default Genres;
