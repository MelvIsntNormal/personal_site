{ async, await } = require 'asyncawait'
express = require 'express'
promisify = require 'promisify-node'
config = require './config'

do async ->

  app = do express

  app.set 'view engine', 'pug'

  app.get '/', (req, res) ->
    res.render 'index'

  {port, hostname} = require './config'
  app.listen port, hostname, ->
    console.log "App listening to #{hostname}:#{port}..."