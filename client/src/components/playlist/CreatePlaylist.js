import React, { useState } from 'react';

import axiosWrapper from '../../lib/axiosWrapper';

import Browse from './Browse';
import ResultCard from './ResultCard';

function CreatePlaylist() {
  const [displayResults, setDisplayResults] = useState(false);
  const [results, setResults] = useState({});

  const getResults = async (res) => {
    const data = await axiosWrapper({
      url: '/search',
      method: 'GET',
      params: res,
    });

    setResults(data.artists.items);
    setDisplayResults(true);
  };

  return (
    <>
      <Browse sendResults={(res) => getResults(res)} />
      {displayResults && results.map((result) => (
        <ResultCard data={result} key={result.id} />
      ))}
    </>

  );
}

export default CreatePlaylist;
