merge = require 'object-merge'
do require('dotenv').config

defaultConfig = 
  env: process.env.APP_ENV ? "production"
  database:
    url: process.env.DATABASE_URL

module.exports = merge defaultConfig, require './environment'

