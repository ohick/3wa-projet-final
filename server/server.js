// Read the .env file.
require('dotenv').config();

// Require the framework
const Fastify = require('fastify');
const querystring = require('query-string');
const closeWithGrace = require('close-with-grace');

const environment = process.env.ENVIRONMENT;
// Instantiate Fastify with some config
const app = Fastify({
  logger: {
    prettyPrint:
      environment === 'development'
        ? {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
          options: {
            colorize: true,
          },
          levelFirst: true,
        }
        : false,
  },
  querystringParser: (str) => querystring.parse(str, { arrayFormat: 'bracket' }),
});

// Register your application as a normal plugin.
const appService = require('./app');

const config = {
  spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
  spotifyUserId: process.env.SPOTIFY_USER_ID,
  spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
  secret: process.env.SECRET,
};

app.register(appService, config);

// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace({ delay: 500 }, async ({ err }) => {
  if (err) {
    app.log.error(err);
  }
  await app.close();
});

app.addHook('onClose', async (instance, done) => {
  closeListeners.uninstall();
  done();
});

// Start listening.
app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
