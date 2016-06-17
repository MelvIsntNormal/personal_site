{ async, await } = require 'asyncawait'
express = require 'express'
config = require './config'
pgp = do require 'pg-promise'

do async ->
  {port, hostname, database: { url }} = config
  app = do express
  dbc = pgp url
  controllers = require('./controllers')(express.Router)

  app.set 'view engine', 'pug'

  app.get '/', async (req, res) ->
    res.render 'index'

  app.get '/static/app.css', async (req, res) ->
    res.sendFile "#{__dirname}/public/app.css"
  app.all '/api', (req, res, next) ->
    req.forAPI = true
    do next

  for base, router of controllers
    app.use "(/api)?/#{base}", router 

  
  app.listen port, hostname, ->
    console.log "App listening to #{hostname}:#{port}..."