export default {
  environment: process.env.NODE_ENV || 'test',
  port: 3000,
  database: {
    url: process.env.POSTGRES_URL,
    port: process.env.PORT,
  },
  tokens: {
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: '1d',
    },
  },
};
