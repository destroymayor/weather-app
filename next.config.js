module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY,
  },
};
