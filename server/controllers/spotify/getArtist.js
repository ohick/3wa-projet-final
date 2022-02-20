const axios = require('axios');

const baseURL = 'https://api.spotify.com/v1';

module.exports = async (req, reply) => {
  const response = await axios.get(
    `${baseURL}/artists`,
    {
      headers: {
        Authorization: `Bearer ${req.token.access_token}`,
      },
      params: { ids: '0oSGxfWSnnOXhD2fKuz2Gy' },
    },
  );

  reply.send(response.data.artists);
};
