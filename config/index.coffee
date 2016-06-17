merge = require 'object-merge'
do require('dotenv').config

defaultConfig = 
  database:
    url: process.env.DATABASE_URL

module.exports = merge defaultConfig, require './environment'

