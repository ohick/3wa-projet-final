const axios = require('axios');
const qs = require('query-string');

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

const getToken = async (req) => {
  const authOptions = {
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: {
      grant_type: 'client_credentials',
    },
    json: true,
  };

  const response = await axios(authOptions);
  req.token = response.data;
};

const getAccess = async (req, reply) => {
  const params = {
    response_type: 'code',
    client_id: req.spotifyClientId,
    scope: 'playlist-modify-public',
    redirect_uri: req.redirectUri,
    state: 'uhzeiufhe52ef3s<f',
  };

  const query = qs.stringify(params);
  reply.redirect(`https://accounts.spotify.com/authorize?${query}`);
};

module.exports = { getToken, getAccess };
