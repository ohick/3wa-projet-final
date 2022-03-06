const axios = require('axios');

const baseURL = 'https://api.spotify.com/v1';

const generalSearch = async (req, reply) => {
  const allTypes = ['artist', 'album', 'track'];
  const type = req.query.includeFields ? req.query.includeFields.join(',') : allTypes.join(',');

  const response = await axios.get(
    `${baseURL}/search`,
    {
      headers: {
        Authorization: `Bearer ${req.token.access_token}`,
      },
      params: { type, q: req.query.q, include_external: 'audio' },
    },
  );

  reply.send(response.data);
};

const genreSearch = async (req, reply) => {
  const response = await axios.get(
    `${baseURL}/recommendations/available-genre-seeds`,
    {
      headers: {
        Authorization: `Bearer ${req.token.access_token}`,
      },
    },
  );

  reply.send(response.data);
};

module.exports = { generalSearch, genreSearch };
