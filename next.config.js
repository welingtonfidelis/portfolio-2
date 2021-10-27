module.exports = {
  env: {
    HANDSHAKE_KEY: process.env.HANDSHAKE_KEY,
    REPLAIN_API_ID: process.env.REPLAIN_API_ID,
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
};
