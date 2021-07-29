module.exports = {
    development: {
      databaseUrl: "mongodb://mongo:27017/auth-service",
      port: process.env.PORT || 3000,
      saltingRounds: 10,
      JWT_SECRET: "secret"
    }
  }