do require('dotenv').config

module.exports = 
  env: process.env.APP_ENV ? "production"
  hostname: process.env.HOSTNAME ? 'localhost'
  port: process.env.PORT ? 8080
  database:
    url: process.env.DATABASE_URL

