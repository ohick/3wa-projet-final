const typeStr = { type: 'string' };

const spotifySearchSchema = {
  query: {
    type: 'object',
    required: ['q'],
    properties: {
      q: {
        type: 'string',
        minLength: 1,
      },
    },
  },
};

const getPlaylistsSchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        required: ['playlist'],
        properties: {
          playlist: {
            type: 'object',
            required: ['id', 'name'],
            properties: {
              id: typeStr,
              name: typeStr,
            },
          },
        },
      },
    },
  },
};

const getPlaylistByIdSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: typeStr,
    },
  },
  response: {
    200: {
      type: 'object',
      required: ['tracks', 'playlist'],
      properties: {
        tracks: { type: 'array' },
        playlist: {
          type: 'object',
          properties: {
            id: typeStr,
            name: typeStr,
            description: typeStr,
          },
        },
      },
    },
  },
};

const addPlaylistSchema = {
  body: {
    type: 'object',
    required: ['name', 'description', 'tracks'],
    properties: {
      name: {
        type: 'string',
        minLength: 1,
      },
      description: {
        type: 'string',
        minLength: 1,
      },
      tracks: {
        type: 'array',
        items: {
          type: 'string',
          minLength: 1,
        },
      },
    },
  },
  response: {
    201: typeStr,
  },
};

const updatePlaylistSchema = {
  body: {
    type: 'object',
    required: ['id', 'name', 'description', 'tracks'],
    properties: {
      id: typeStr,
      name: typeStr,
      description: typeStr,
      tracks: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            trackId: typeStr,
            spotify_id: typeStr,
          },
        },
      },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: typeStr,
        name: typeStr,
        description: typeStr,
        tracks: {
          type: 'array',
          items: typeStr,
        },
      },
    },
  },
};

const deletePlaylistSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: typeStr,
    },
  },
  response: {
    203: typeStr,
  },
};

module.exports = {
  spotifySearchSchema,
  getPlaylistByIdSchema,
  getPlaylistsSchema,
  addPlaylistSchema,
  updatePlaylistSchema,
  deletePlaylistSchema,
};
