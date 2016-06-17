{ async, await } = require 'asyncawait'
express = require 'express'
promisify = require 'promisify-node'
config = require './config'

do async ->

  app = do express

  controllers = require('./controllers')(express.Router)

  app.set 'view engine', 'pug'

  app.get '/', (req, res) ->
    res.render 'index'

  app.all '/api', (req, res, next) ->
    req.forAPI = true
    do next

  for base, router of controllers
    app.use "(/api)?/#{base}", router 

  {port, hostname} = require './config'
  app.listen port, hostname, ->
    console.log "App listening to #{hostname}:#{port}..."