const config = {
  disableAuth: process.env.DISABLE_AUTH || false,
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'awesomeJWT123',
  jwtExpireIn: process.env.JWT_EXPIRE_IN || '30d',
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost/mongo-express-starter'
};

module.exports = config;
