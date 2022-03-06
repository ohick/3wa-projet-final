import React from 'react';

import ResultCard from '../components/playlist/ResultCard';

import artist from './fixtures/result.artist.json';

export default {
  title: 'Spotify/artist card',
  component: ResultCard,
};

function Template(args) {
  return <ResultCard {...args} />;
}

export function ArtistCard() {
  return <ResultCard data={artist} />;
}
