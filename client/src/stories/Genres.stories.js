import React from 'react';

import Genres from '../components/playlist/Genres';

import genres from './fixtures/genres.json';

export default {
  title: 'Spotify/GetGenres',
  component: Genres,
};

function Template(args) {
  return <ResultCard {...args} />;
}

export function GetGenres() {
  return <Genres genres={genres} />;
}
