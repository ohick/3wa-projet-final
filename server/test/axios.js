const fp = require('fastify-plugin');
const axios = require('axios');

module.exports = fp(async (fastify) => {
  const baseUrl = 'http://localhost:5000';
  fastify.decorateRequest('axiosConfig', '');
  fastify.register('axiosWrapper', async (request) => {
    const { axiosConfig } = request;
    const { data } = await axios({
      url: baseUrl + axiosConfig.url,
      method: axiosConfig.method,
      data: axiosConfig.data,
      params: axiosConfig.params,
      validateStatus(status) {
        return status < 500;
      },
    });

    return data;
  });
});
